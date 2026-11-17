 import Phaser from 'phaser';
import { Paddle } from '../entities/Paddle';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        this.players = new Map();
        this.inputMappings = [];
    }

    preload() {
        // Load assets
        this.load.image('tilemap', 'assets/images/tilemap_packed.png');
        this.load.image('olas','assets/images/olas_placeholder.png')
        this.load.atlas('player', 'assets/images/characters.png', 'assets/images/characters_atlas.json');    

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('music', 'assets/audio/music.mp3');
    }

    create() {

               
        //Create platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(700,500, 'tilemap');

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

        // Setup players
        this.setUpPlayers();

        // Pause with ESC and show the pause menu on top
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
    }

    setUpPlayers() {
        const player1 = new Player(this, 'player1', 50, 300);
        const player2 = new Player(this, 'player2', 750, 300);

        this.players.set(player1.id, player1);
        this.players.set(player2.id, player2);
        

        this.physics.add.collider(player1.sprite, this.platforms)
        this.physics.add.collider(player2.sprite, this.platforms)

        this.physics.add.overlap(player1.sprite, this.deathzone, () => {
            player1.sprite.body.reset(480, 0);
        })
        this.physics.add.overlap(player2.sprite, this.deathzone, () => {
            player2.sprite.body.reset(480, 0);
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

            if (mapping.upKey.isDown && player.sprite.body.onFloor()) {
                player.sprite.setVelocityY(-350);
            } 
            
            player.sprite.setVelocityX(0);

            if (mapping.leftKey.isDown) {
                player.sprite.setVelocityX(-player.speed);
            }else if (mapping.rightKey.isDown) {
                player.sprite.setVelocityX(player.speed);
            }
        });

    }
}
