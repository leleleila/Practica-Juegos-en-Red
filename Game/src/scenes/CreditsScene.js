import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class CreditsScene extends BaseScene {
    constructor() {
        super('CreditsScene');
    }

    // CAMBIAR ESTO Y HACER EL PRELOAD SOLO EN LA BASE SCENE
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('boton_volver', 'assets/images/boton_volver.png');
    }

    create() {
    
        this.cameras.main.setBackgroundColor('#91dfeb');
        
        //this.crearTexto(480, 70, 'CRÉDITOS', '100px' );

        this.crearBotonNoInteractivo(480, 60, 260, 40, 8, 'Programación', '#000000', '36px');
        //this.crearTexto(480, 70, 'Programación', '#000000','28px' );
            this.crearTexto(480, 110, 'Iván Domingo Reyes', '#000000', '18px');
            this.crearTexto(480, 150, 'Leila Aabbouz Chillada', '#000000', '18px');
            this.crearTexto(480, 190, 'Genma de Argüeso Muñoz', '#000000', '18px');
            this.crearTexto(480, 230, 'Aimar Hernández Holgado', '#000000', '18px');

            this.crearBotonNoInteractivo(480, 280, 230, 40, 8, 'Pixel Art', '#000000', '28px');
            //this.crearTexto(480, 280, 'Pixel Art', '#000000', '28px');
            this.crearTexto(480, 330, 'Leila Aabbouz Chillada', '#000000', '18px');
            this.crearTexto(480, 370, 'Aimar Hernández Holgado', '#000000', '18px');

        this.crearBotonNoInteractivo(480, 440, 230, 40, 8, 'Sonido', '#000000', '28px');
        //this.crearTexto(480, 440, 'Sonido', '#000000', '28px');
            this.crearTexto(480, 490, 'pixabay.com', '#000000', '18px');

        //Botón volver al menú
        this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);
    }
}


