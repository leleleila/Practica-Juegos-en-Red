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
        
        this.crearTexto(480, 70, 'CRÉDITOS', { fontSize: '100px' });

        this.crearTexto(480, 130, 'Programación', '#000000', { fontSize: '28px' });
            this.crearTexto(480, 170, 'Iván Domingo Reyes', '#000000', { fontSize: '18px' });
            this.crearTexto(480, 200, 'Genma de Argüeso Muñoz', '#000000', { fontSize: '18px' });
            this.crearTexto(480, 230, 'Leila Aabbouz Chillada', '#000000', { fontSize: '18px' });

        this.crearTexto(480, 280, 'Pixel Art', '#000000', { fontSize: '28px' });
            this.crearTexto(480, 330, 'Leila Aabbouz Chillada', '#000000', { fontSize: '18px' });
            this.crearTexto(480, 360, 'Aimar Hernández Holgado', '#000000', { fontSize: '18px' });

        this.crearTexto(480, 440, 'Sonido', '#000000', { fontSize: '28px' });
            this.crearTexto(480, 470, 'Aqui ponemos de donde hemos cogido la musica y los efectos de sonido', '#000000', { fontSize: '18px' });

        //Botón volver al menú
        this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);
    }
}


