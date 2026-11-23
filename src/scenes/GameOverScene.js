import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class GameOverScene extends BaseScene {
    constructor() {
        super('GameOverScene');
    }

// Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('boton_volver', 'assets/images/boton_volver.png');
    }
 
 //Botón volver al menú
 create(){
    // Fondo
        this.cameras.main.setBackgroundColor('#91dfeb');

        // Título
        this.crearTexto(480, 200 , 'GAME OVER', '#ffffff', { fontSize: '64px' });

    this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);
 }
}