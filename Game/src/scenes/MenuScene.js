import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class MenuScene extends BaseScene {
    constructor() {
        super('MenuScene');
    }

    // Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('fondo', 'assets/images/fondo.png');
        this.load.audio('gameplay', 'assets/audio/gameplay.mp3');
        this.load.audio('pausa', 'assets/audio/pausa.mp3');
        
    }

    create() {

        // Fondo
        // this.cameras.main.setBackgroundColor('#91dfeb');
        this.add.image(480, 270, 'fondo');

        // Título
        this.add.image(480, 110, 'logo').setOrigin(0.5);

        // Botones
        this.crearBoton(480, 250, 260, 63, 8, 'Juego Local', 'TutorialScene', () => {
            if (this.music) {
                this.music.stop();
                this.music.destroy();
            }
        });

        this.crearBoton(480, 330, 260, 63, 8, 'Ajustes', 'SettingsScene');
        this.crearBoton(480, 410, 260, 63, 8, 'Creditos', 'CreditsScene');
        this.crearBoton(480, 490, 260, 63, 8, 'Ayuda', 'TutorialScene');
        

        // Música de menú (solo se crea si no está sonando ya)
        const savedVolume = this.registry.get('volume') !== undefined ? this.registry.get('volume') : 1;
        const existente = this.sound.get('pausa');

        if (!existente) {
            this.music = this.sound.add('pausa', { loop: true, volume: savedVolume });
            this.music.play();
        } else {
            this.music = existente;
            this.music.setVolume(savedVolume);
            if (!this.music.isPlaying) {
                this.music.play();
            }
        }

       

    }
}