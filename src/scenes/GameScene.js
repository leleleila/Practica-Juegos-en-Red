 import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Weapon } from '../entities/Weapon';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        this.players = new Map();
        this.inputMappings = [];
        this.score = {
            player1: 0,
            player2: 0
        };
    }

    preload() {
        // Load assets
        this.load.image('tilemap', 'assets/images/tilemap_packed.png');
        this.load.image('olas', 'assets/images/olas_placeholder.png');
        this.load.image('katana', 'assets/images/katana.png')

        this.load.spritesheet('player', 'assets/images/characters.png', {
            frameWidth: 42,
            frameHeight: 41
        });    

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('music', 'assets/audio/music.mp3');
    }

    create() {

               
        //Crear plataformas solidas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(700, 500, 'tilemap');

        //Crear plataformas semisolidas para ambos jugadores
        //Por como se manejan la acción de atravesarlas tenemos que hace hacer dos grupos
        this.semisolidPlatformsPlayer1 = this.physics.add.staticGroup();
        this.semisolidPlatformsPlayer1.create(700,400, 'tilemap').setOrigin(0).refreshBody()
        this.semisolidPlatformsPlayer1.create(20,400, 'tilemap').setOrigin(0).refreshBody()


        this.semisolidPlatformsPlayer1.children.iterate((platform) => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.left = false;
        });


        this.semisolidPlatformsPlayer2 = this.physics.add.staticGroup();
        this.semisolidPlatformsPlayer2.create(700,400, 'tilemap').setOrigin(0).refreshBody()

        this.semisolidPlatformsPlayer2.children.iterate((platform) => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.left = false;
        });

        this.deathzone = this.physics.add.group({
            key: 'olas',
            allowGravity: false,
            setXY: { x: 480, y: 850 }
        });

        // Looping background music con el volumen de SettingsScene
        const savedVolume = this.registry.get('volume') !== undefined ? this.registry.get('volume') : 1;
        this.sound.volume = savedVolume;
        this.music = this.sound.add('music', { loop: true });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.on('pause', () => this.music.pause());
        this.events.on('resume', () => this.music.resume());
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.input.keyboard.off('keydown-ESC');
            this.music.destroy();
        });

        // Animaciones de los personajes
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 25 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: [{ key: 'player', frame: 8 }],
            frameRate: 10
        });
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 12 }],
            frameRate: 40,
            }
        )

        this.anims.create(
            {
            key: 'katana',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 24
            }
        )

        this.anims.create(
            {
            key: 'hit',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
            frameRate: 12,
            repeat: 2
            }
        )

        // Setup players
        this.setUpPlayers();

        // Pause with ESC and show the pause menu on top
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        //Puntuación
        this.scoreLeft = this.add.text(400, 50, '0', { fontSize: '48px' }).setOrigin(0.5);
        this.scoreRight = this.add.text(608, 50, '0', { fontSize: '48px' }).setOrigin(0.5);
    }

    setUpPlayers() {
        const player1 = new Player(this, 'player1', 50, 300);
        const player2 = new Player(this, 'player2', 750, 300);

        const weaponTest = new Weapon(this, 500, 300);

        this.physics.add.overlap(player1.sprite, weaponTest.sprite, () => {
            player1.weapon = 'katana';
            weaponTest.sprite.destroy();
        })
        this.physics.add.overlap(player2.sprite, weaponTest.sprite, () => {
            player1.weapon = 'katana';
            weaponTest.sprite.destroy();
        })

        this.players.set(player1.id, player1);
        this.players.set(player2.id, player2);

        player1.enemy = player2;
        player2.enemy = player1;
        
        this.physics.add.collider(player1.sprite, this.platforms);
        this.physics.add.collider(player2.sprite, this.platforms);

        this.physics.add.collider(player1.sprite, this.semisolidPlatformsPlayer1, this.onPlatform);
        this.physics.add.collider(player2.sprite, this.semisolidPlatformsPlayer2, this.onPlatform);


        this.physics.add.overlap(player1.sprite, this.deathzone, () => {
            this.loseRound(player1);
        })
        this.physics.add.overlap(player2.sprite, this.deathzone, () => {
            this.loseRound(player2);
        })

        const Keys = Phaser.Input.Keyboard.KeyCodes;
        const ctrlCambiados = this.registry.get('controls') || {
            p1: { up: 'W', left: 'A', right: 'D', attack: 'SPACE', down: 'S' },
            p2: { up: 'UP', left: 'LEFT', right: 'RIGHT', attack: 'P', down: 'DOWN' }
        };

        this.inputMappings = [
            {
                player: player1,
                up: Keys[ctrlCambiados.p1.up] || Keys.W,
                down: Keys[ctrlCambiados.p1.down] || Keys.S,
                left: Keys[ctrlCambiados.p1.left] || Keys.A,
                right: Keys[ctrlCambiados.p1.right] || Keys.D,
                attack: Keys[ctrlCambiados.p1.attack] || Keys.SPACE
            },
            {
                player: player2,
                up: Keys[ctrlCambiados.p2.up] || Keys.UP,
                down: Keys[ctrlCambiados.p2.down] || Keys.DOWN,
                left: Keys[ctrlCambiados.p2.left] || Keys.LEFT,
                right: Keys[ctrlCambiados.p2.right] || Keys.RIGHT,
                attack: Keys[ctrlCambiados.p2.attack] || Keys.P
            }
        ].map(mapping => ({
            player: mapping.player,
            upKey: this.input.keyboard.addKey(mapping.up),
            downKey: this.input.keyboard.addKey(mapping.down),
            leftKey: this.input.keyboard.addKey(mapping.left),
            rightKey: this.input.keyboard.addKey(mapping.right),
            attackKey: this.input.keyboard.addKey(mapping.attack)
        }));
    }

    update(time, delta) {
        this.inputMappings.forEach(mapping => {
            const player = mapping.player;

            player.sprite.setVelocityX(0);

            //Movimiento Horizontal
            if (mapping.leftKey.isDown) {
                player.sprite.setVelocityX(-player.speed);
                player.sprite.setFlipX(false);

            }else if (mapping.rightKey.isDown) {
                player.sprite.setVelocityX(player.speed);
                player.sprite.setFlipX(true);
            }



            //Salto

            if (mapping.upKey.isDown && player.sprite.body.onFloor()) {
                player.sprite.setVelocityY(-350);
            } 


            //Atravesar plataforma semisolid
            if (mapping.upKey.isDown && player.sprite.body.touching.down)
            {
                player.sprite.setVelocityY(-400);
                if (player.sprite.isOnPlatform){
                    player.sprite.onPlatform.body.checkCollision.up = true;
                    player.sprite.isOnPlatform = false;
                    player.sprite.onPlatform = null;
                }
                
            }
            if ((mapping.downKey.isDown && player.sprite.isOnPlatform)) {
                player.sprite.onPlatform.body.checkCollision.up = false;
            }
            //Atacar
            if (mapping.attackKey.isDown) {
                if (!player.isAttacking && !player.isHit)
                {
                    this.playerAttack(player);
                }
            }


            //Animaciones
            if (!player.isAttacking && !player.isHit){
                if(!player.sprite.body.onFloor())
                {
                    if (player.sprite.body.velocity.y > 0)
                    {
                        player.sprite.anims.play('fall',true);
                    } else{
                        player.sprite.anims.play('jump',true);
                    }
                } else
                {   
                    if(mapping.rightKey.isDown || mapping.leftKey.isDown)
                    {
                        player.sprite.anims.play('run',true);
                    } else{
                        player.sprite.anims.play('idle',true);
                    }
                }
            }


            //Mover la hitbox con el personaje
            if (player.isAttacking && player.hitbox != null)
            {
                let offsetX = player.sprite.flipX ? 12 : -12;
                let targetX = player.sprite.x + offsetX;
                let targetY = player.sprite.y;

                player.hitbox.setPosition(targetX, targetY);
                player.hitbox.body.reset(targetX, targetY);
            }
        });
    }

    // Para detectar si puedes atravesarla
    onPlatform(player, platform) {
        player.isOnPlatform = true;
        player.onPlatform = platform;
    }

    //Perder una ronda
    loseRound(player) {
        player.sprite.body.enable = false;
        player.isHit = true;
        player.sprite.anims.play('hit',true);
        if (player.id === 'player1')
        {
            this.score.player2 += 1;
        } else
        {
            this.score.player1 += 1;
        }

        player.sprite.once('animationcomplete', () => {
            player.sprite.setPosition(480, 0);
            player.sprite.setVelocityY(0);
            player.sprite.body.enable = true;
            player.isHit = false;
        });

        this.scoreRight.setText(this.score.player1.toString());
        this.scoreLeft.setText(this.score.player2.toString());
    }

    //Ataque de un jugador
    playerAttack(player)
    {
        switch(player.weapon){ 
            case 'katana':
                player.isAttacking = true;
                player.sprite.anims.play('katana', true);

                let offsetX = player.sprite.flipX ? 12 : -12; //El sprite del jugador se queda a un lado u otro
                //Crear la hitbox
                let hitbox = this.add.rectangle(player.sprite.x + offsetX,player.sprite.y,20,32);

                this.physics.add.existing(hitbox, false);
                hitbox.body.setAllowGravity(false);

                this.physics.add.overlap(player.enemy.sprite, hitbox, () => {
                    this.loseRound(player.enemy);
                })
                
                player.hitbox = hitbox;

                player.sprite.once('animationcomplete', () => {
                    player.isAttacking = false;
                    if (player.hitbox)
                    {
                        player.hitbox.destroy();
                        player.hitbox = null;
                        player.weapon = null;
                    }
                });
                break;
            default:
                break;
        }
    }
}
