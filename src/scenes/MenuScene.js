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
    }

    create() {

        // Fondo
        // this.cameras.main.setBackgroundColor('#91dfeb');
        this.add.image(480, 270, 'fondo');

        // Título
        this.add.image(480, 110, 'logo').setOrigin(0.5);

        // Botones
        this.crearBoton(480, 270, 260, 68, 8, 'Juego Local', 'TutorialScene');
        this.crearBoton(480, 380, 260, 68, 8, 'Ajustes', 'SettingsScene');
        this.crearBoton(480, 480, 260, 68, 8, 'Creditos', 'CreditsScene');

    }
}