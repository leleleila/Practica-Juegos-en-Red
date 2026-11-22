import Phaser from 'phaser';
import { Player } from '../entities/Player';

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
        this.load.image('olas','assets/images/olas_placeholder.png')
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
        this.platforms.create(700,500, 'tilemap');

        //Crear plataformas semisolidas para ambos jugadores
        //Por como se manejan la acción de atravesarlas tenemos que hace hacer dos grupos
        this.semisolidPlatformsPlayer1 = this.physics.add.staticGroup();
        this.semisolidPlatformsPlayer1.create(700,400, 'tilemap').setOrigin(0).refreshBody()

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


        this.deathzone = this.physics.add.group(
            {
                key: 'olas',
                allowGravity: false,
                setXY: {x: 480, y:850}
            }
        )



        // Looping background music
        this.music = this.sound.add('music', { loop: true, volume: 0.3 });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.on('pause', () => this.music.pause());
        this.events.on('resume', () => this.music.resume());
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });


        this.anims.create(
            {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 25 }),
            frameRate: 10,
            repeat: -1
            }
        )
        this.anims.create(
            {
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 20 }),
            frameRate: 10,
            repeat: -1
            }
        )
        this.anims.create(
            {
            key: 'fall',
            frames: [{ key: 'player', frame: 8 }],
            frameRate: 10,
            }
        )
        this.anims.create(
            {
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 12 }),
            frameRate: 40,
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

        this.players.set(player1.id, player1);
        this.players.set(player2.id, player2);
        
        this.players.set(player1.deaths, 0)
        this.players.set(player2.deaths, 0)

        this.physics.add.collider(player1.sprite, this.platforms)
        this.physics.add.collider(player2.sprite, this.platforms)

        this.physics.add.collider(player1.sprite, this.semisolidPlatformsPlayer1, this.onPlatform)
        this.physics.add.collider(player2.sprite, this.semisolidPlatformsPlayer2, this.onPlatform)


        this.physics.add.overlap(player1.sprite, this.deathzone, () => {
            this.loseRound(player1.sprite);
        })
        this.physics.add.overlap(player2.sprite, this.deathzone, () => {
            this.loseRound(player2.sprite);
        })

        const Keys = Phaser.Input.Keyboard.KeyCodes;
        this.inputMappings = [
            {player: player1, up: Keys.W, down: Keys.S, left: Keys.A, right: Keys.D},
            {player: player2, up: Keys.UP, down: Keys.DOWN, left: Keys.LEFT, right: Keys.RIGHT}
        ].map(mapping => ({
            player: mapping.player,
            upKey: this.input.keyboard.addKey(mapping.up),
            downKey: this.input.keyboard.addKey(mapping.down),
            leftKey: this.input.keyboard.addKey(mapping.left),
            rightKey: this.input.keyboard.addKey(mapping.right)
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
                if (player.sprite.body.onFloor()){
                    player.sprite.anims.play('run',true)
                }
            }else if (mapping.rightKey.isDown) {
                player.sprite.setVelocityX(player.speed);
                player.sprite.setFlipX(true);
                if (player.sprite.body.onFloor()){
                    player.sprite.anims.play('run',true)
                }
            }else if(player.sprite.body.onFloor()){
                player.sprite.anims.play('idle', true);
            }



            //Salto
            if (player.sprite.body.velocity.y > 0) {
                player.sprite.anims.play('fall', true);
            }
            
            if (mapping.upKey.isDown && player.sprite.body.onFloor()) {
                player.sprite.setVelocityY(-350);
                player.sprite.anims.play('jump')
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

        });

    }
    
    //Para detectar si puedes atravesarla
    onPlatform(player, platform) {   
        player.isOnPlatform = true;
        player.onPlatform = platform;
    }

    //Perder una ronda
    loseRound(player) {
        player.y -= 300
        if (player.id == 'player1')
        {
            this.score.player2 += 1;
        } else
        {
            this.score.player1 += 1;
        }
        this.scoreRight.setText(this.score.player1.toString());
        this.scoreLeft.setText(this.score.player2.toString());
    }
}
