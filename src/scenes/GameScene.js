import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Weapon } from '../entities/Weapon';
import { PowerUp } from '../entities/PowerUp';

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
        this.load.image('olas', 'assets/images/olas.png');

        this.load.image('katana', 'assets/images/katana.png');
        this.load.image('baston', 'assets/images/baston.png');
        this.load.image('shuriken', 'assets/images/shuriken.png');

        this.load.image('shield', 'assets/images/escudo.png');
        this.load.image('speed', 'assets/images/frenetizante.png');
        this.load.image('canon', 'assets/images/canon.png');

        this.load.image('bala','assets/images/bala.png');
        this.load.image('shuriken-proj', 'assets/images/shuriken-proj.png');

        this.load.image('escenario', 'assets/images/pagoda.png')

        this.loadPlayerSpritesheet('player_blue', 'assets/images/characters_blue.png');
        this.loadPlayerSpritesheet('player_purple', 'assets/images/characters_purple.png');

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('gameplay', 'assets/audio/gameplay.mp3');
    }

    loadPlayerSpritesheet(key, path) {
        this.load.spritesheet(key, path, {
            frameWidth: 42,
            frameHeight: 41
        });
    }

    setUpPlayerAnimations(key) {
        this.anims.create({
            key: `${key}_idle`,
            frames: this.anims.generateFrameNumbers(key, { start: 21, end: 25 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: `${key}_run`,
            frames: this.anims.generateFrameNumbers(key, { start: 13, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: `${key}_fall`,
            frames: [{ key: key, frame: 8 }],
            frameRate: 10
        });
        this.anims.create({
            key: `${key}_jump`,
            frames: [{ key: key, frame: 12 }],
            frameRate: 40
        });
        this.anims.create({
            key: `${key}_katana`,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 5 }),
            frameRate: 24
        });
        this.anims.create({
            key: `${key}_hit`,
            frames: this.anims.generateFrameNumbers(key, { start: 6, end: 7 }),
            frameRate: 12,
            repeat: 2
        });
        this.anims.create({
            key: `${key}_baston`,
            frames: this.anims.generateFrameNumbers(key, { start: 37, end: 41 }),
            frameRate: 24
        });
        this.anims.create({
            key: `${key}_shuriken`,
            frames: this.anims.generateFrameNumbers(key, { start: 31, end: 36 }),
            frameRate: 24
        });

        this.anims.create(
            {
            key: `${key}_canon`,
            frames: this.anims.generateFrameNumbers(key, { start: 26, end: 30 }),
            frameRate: 24 
            }
        )
    }

    create() {
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'escenario');

        //Crear plataformas solidas
        this.platforms = this.physics.add.staticGroup();

        //Plataformas de los arboles
        let platSolid = this.add.rectangle(33, 380, 160, 160).setOrigin(0, 0);
        this.physics.add.existing(platSolid, true);
        this.platforms.add(platSolid);

        platSolid = this.add.rectangle(768, 380, 160, 160).setOrigin(0, 0);
        this.physics.add.existing(platSolid, true);
        this.platforms.add(platSolid);

        //Plataformas de la pagoda
        platSolid = this.add.rectangle(225, 413, 512, 134).setOrigin(0, 0);
        this.physics.add.existing(platSolid, true);
        this.platforms.add(platSolid);

        platSolid = this.add.rectangle(337, 380, 288, 33).setOrigin(0, 0);
        this.physics.add.existing(platSolid, true);
        this.platforms.add(platSolid);

        //Crear plataformas semisolidas para ambos jugadores
        //Por como se manejan la acción de atravesarlas tenemos que hace hacer dos grupos
        this.semisolidPlatformsPlayer1 = this.physics.add.staticGroup();

        //Plataformas flores
        let platSemi = this.add.rectangle(41, 223, 94, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(85, 281, 58, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(20, 334, 66, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(165, 318, 76, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(199, 256, 76, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(206, 201, 57, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(875, 333, 66, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(720, 319, 76, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(818, 281, 58, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(685, 256, 76, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(827, 222, 93, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(698, 201, 57, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);



        //Plataformas pagoda
        platSemi = this.add.rectangle(336, 318, 288, 8).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(336, 256, 288, 8).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(336, 194, 288, 8).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        platSemi = this.add.rectangle(428, 138, 104, 7).setOrigin(0, 0);
        this.physics.add.existing(platSemi, true);
        this.semisolidPlatformsPlayer1.add(platSemi);

        this.semisolidPlatformsPlayer1.children.iterate((platform) => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.left = false;
        });


        this.semisolidPlatformsPlayer2 = this.physics.add.staticGroup();
        this.semisolidPlatformsPlayer1.children.iterate((platform) => {
            const copy = this.add.rectangle(
                platform.x,
                platform.y,
                platform.width,
                platform.height
            ).setOrigin(0, 0);

            this.physics.add.existing(copy, true);
            this.semisolidPlatformsPlayer2.add(copy);
        });

        this.semisolidPlatformsPlayer2.children.iterate((platform) => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.left = false;
        });

        //Agua subiendo
        this.deathzone = this.physics.add.sprite(480, 850, 'olas');
        this.deathzone.body.setAllowGravity(false);
        this.deathzone.setVelocityY(-5);
        this.deathzone.body.setSize(this.deathzone.width * 2, this.deathzone.height);
        this.deathzone.body.setOffset(-this.deathzone.width / 2, 10);
        this.deathzone.setDepth(10);

        // Looping background music con el volumen de SettingsScene
        const savedVolume = this.registry.get('volume') !== undefined ? this.registry.get('volume') : 1;
        this.sound.volume = savedVolume;
        this.music = this.sound.add('gameplay', { loop: true });
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
        this.setUpPlayerAnimations('player_blue')
        this.setUpPlayerAnimations('player_purple')

        //Grupo para los proyectiles
        this.proyectiles = this.physics.add.group(
            {
                allowGravity: false
            }
        )
        this.physics.add.collider(this.proyectiles, this.platforms, (shuriken) => {
            shuriken.destroy();
        })

        // Setup players
        this.setUpPlayers();

        // Pause with ESC and show the pause menu on top
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        // Generación de armas
        this.weapons = this.physics.add.group({
            allowGravity: false
        });
        this.isOnSpawn = [false, false, false, false, false, false];

        this.weaponTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 4000),
            callback: this.spawnWeapon,
            callbackScope: this,
            loop: true
        })

        this.powerUpActive = false;
        this.powerTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 10000),
            callback: () => {
                if (!this.powerUpActive) {
                    this.powerUpActive = true;
                    const powerUp = new PowerUp(this, 480, 100);
                    this.players.forEach((player) => {
                        this.physics.add.overlap(player.sprite, powerUp.sprite, () => {
                            this.playerPowerUp(player, powerUp.name);
                            powerUp.sprite.destroy();
                            this.powerUpActive = false;
                        });
                    });
                }
            },
            callbackScope: this,
            loop: true
        })

        //Puntuación
        this.scoreLeft = this.add.text(400, 50, '0', { fontSize: '48px' }).setOrigin(0.5);
        this.scoreRight = this.add.text(608, 50, '0', { fontSize: '48px' }).setOrigin(0.5);

    }

    SPRITESHEETS = ['player_blue', 'player_purple']

    setUpPlayers() {
        const disponibles = [...this.SPRITESHEETS];

        const sprite1 = Phaser.Utils.Array.RemoveRandomElement(disponibles);
        const player1 = new Player(this, 'player1', 50, 300, sprite1);

        const sprite2 = Phaser.Utils.Array.RemoveRandomElement(disponibles);
        const player2 = new Player(this, 'player2', 750, 300, sprite2);

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
        //Controles personajes
        this.inputMappings.forEach(mapping => {
            const player = mapping.player;

            player.sprite.setVelocityX(0);

            //Movimiento Horizontal
            if (mapping.leftKey.isDown) {
                player.sprite.setVelocityX(-player.speed);
                player.sprite.setFlipX(false);
                player.sprite.body.setOffset(20,12);

            } else if (mapping.rightKey.isDown) {
                player.sprite.setVelocityX(player.speed);
                player.sprite.setFlipX(true);
                player.sprite.body.setOffset(10,12);
            }



            //Salto

            if (mapping.upKey.isDown && player.sprite.body.onFloor()) {
                player.sprite.setVelocityY(-350);
            }


            //Atravesar plataforma semisolid
            if (mapping.upKey.isDown && player.sprite.body.touching.down) {
                player.sprite.setVelocityY(-400);
                if (player.sprite.isOnPlatform) {
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
                if (!player.isAttacking && !player.isHit) {
                    this.playerAttack(player);
                }
            }


            //Animaciones
            const tex = player.sprite.texture.key;
            if (!player.isAttacking && !player.isHit) {
                if (!player.sprite.body.onFloor()) {
                    if (player.sprite.body.velocity.y > 0) {
                        player.sprite.anims.play(`${tex}_fall`, true);
                    } else {
                        player.sprite.anims.play(`${tex}_jump`, true);
                    }
                } else {
                    if (mapping.rightKey.isDown || mapping.leftKey.isDown) {
                        player.sprite.anims.play(`${tex}_run`, true);
                    } else {
                        player.sprite.anims.play(`${tex}_idle`, true);
                    }
                }
            }


            //Mover la hitbox con el personaje
            if (player.isAttacking && player.hitbox != null) {
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
        if (player.onPlatform != null) {
            player.onPlatform.body.checkCollision.up = true;
        }

        player.isOnPlatform = true;
        player.onPlatform = platform;
    }

    //Perder una ronda
    loseRound(player) {
        player.sprite.body.enable = false;
        player.isHit = true;

        const tex = player.sprite.texture.key;
        player.sprite.anims.play(`${tex}_hit`, true);
        if (player.id === 'player1') {
            this.score.player2 += 1;
        } else {
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

        // Comprueba si algún jugador ha alcanzado el número de rondas puesto
        const totalRond = this.registry.get('ronda') || 3;
        const diferencia = Math.abs(this.score.player1 - this.score.player2);
        const rondasRestantes = totalRond - (this.score.player1 + this.score.player2);

        if (diferencia >= rondasRestantes || this.score.player1 >= totalRond || this.score.player2 >= totalRond) { //Mantengo las otras condiciones por si acaso
            this.music.stop();
            this.scene.start('GameOverScene', {score : this.score});
        }
    }


    //Ataque de un jugador
    playerAttack(player) {
        let offsetX = player.sprite.flipX ? 12 : -12; //El sprite del jugador se queda a un lado u otro
        let hitbox = this.add.rectangle(player.sprite.x + offsetX, player.sprite.y, 20, 32); //Hitbox ataques cuerpo a cuerpo

        const tex = player.sprite.texture.key;
        switch (player.weapon) {
            case 'katana':
                player.isAttacking = true;
                player.sprite.anims.play(`${tex}_katana`, true);

                //Crear la hitbox
                this.physics.add.existing(hitbox, false);
                hitbox.body.setAllowGravity(false);

                this.physics.add.overlap(player.enemy.sprite, hitbox, () => {
                    if (!player.enemy.isInvincible)
                        this.loseRound(player.enemy);
                })

                player.hitbox = hitbox;

                player.sprite.once('animationcomplete', () => {
                    player.isAttacking = false;
                    if (player.hitbox) {
                        player.hitbox.destroy();
                        player.hitbox = null;
                        player.weapon = null;
                    }
                });
                break;
            case 'baston':
                player.isAttacking = true;
                player.sprite.anims.play(`${tex}_baston`, true);

                this.physics.add.existing(hitbox, false);
                hitbox.body.setAllowGravity(false);

                this.physics.add.overlap(player.enemy.sprite, hitbox, () => {
                    if (!player.enemy.isInvincible)
                        this.loseRound(player.enemy);
                })

                player.hitbox = hitbox;

                player.sprite.once('animationcomplete', () => {
                    player.isAttacking = false;
                    if (player.hitbox) {
                        player.hitbox.destroy();
                        player.hitbox = null;
                        player.weapon = null;
                    }
                });
                break;
            case 'shuriken':
                player.isAttacking = true;
                player.sprite.anims.play(`${tex}_shuriken`, true);

                player.sprite.once('animationcomplete', () => {

                    const shuriken = this.proyectiles.create(player.sprite.x + (player.sprite.flipX ? 20 : -20), player.sprite.y, 'shuriken-proj');
                    shuriken.setVelocityX(player.sprite.flipX ? 500 : -500);
                    shuriken.setAngularVelocity(500);
                    shuriken.setScale(2,2);
                    this.physics.add.overlap(player.enemy.sprite, shuriken, () => {
                        shuriken.destroy();
                        if (!player.enemy.isInvincible)
                            this.loseRound(player.enemy);
                    })

                    player.isAttacking = false;
                    player.weapon = null;

                })

                break;

                case 'canon':
                    player.isAttacking = true;
                    player.sprite.anims.play(`${tex}_canon`, true);

                    player.sprite.once('animationcomplete', () => {

                        const bala = this.proyectiles.create(player.sprite.x + (player.sprite.flipX ? 20 : -20), player.sprite.y, 'bala');
                        bala.setVelocityX(player.sprite.flipX ? 800 : -800);

                        this.physics.add.overlap(player.enemy.sprite, bala, () =>{
                            bala.destroy();
                            if(!player.enemy.isInvincible)
                                this.loseRound(player.enemy);
                        })

                        player.isAttacking = false;
                        player.weapon = null;

                    })

                break;
            default:
                break;
        }
    }


    spawnWeapon() {
        const maxWeapons = 3; //Evitamos que spawneen demasiadas
        if (this.weapons.countActive(true) >= maxWeapons) {
            return;
        }

        const spawnPoints = [
            { x: 480, y: 160 },
            { x: 380, y: 225 },
            { x: 580, y: 225 },
            { x: 480, y: 290 },
            { x: 110, y: 250 },
            { x: 850, y: 250 }
        ]


        const idx = Phaser.Math.Between(0, 5);

        if (this.isOnSpawn[idx]) {
            return;
        }

        this.isOnSpawn[idx] = true;
        const point = spawnPoints[idx];

        const weapon = new Weapon(this, point.x, point.y);

        this.weapons.add(weapon.sprite);

        this.players.forEach((player) => {
            this.physics.add.overlap(player.sprite, weapon.sprite, () => {
                player.weapon = weapon.name;
                weapon.sprite.destroy();
                this.isOnSpawn[idx] = false;
            });
        });
    }

    playerPowerUp(player, powerName) {
        switch (powerName) {
            case 'speed':
                player.speed = 600;
                this.time.addEvent({
                    delay: 5000,
                    loop: false,
                    callback: () => {
                        player.speed = 300
                    },
                    callbackScope: this
                })
                break;

            case 'shield':
                player.isInvincible = true;
                this.time.addEvent({
                    delay: 5000,
                    loop: false,
                    callback: () => {
                        player.isInvincible = false;
                    },
                    callbackScope: this
                })
                break;
        }
    }
}
