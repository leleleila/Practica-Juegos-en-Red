import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';
import { ControlsScene } from './ControlsScene.js';

export class TutorialScene extends BaseScene {
    constructor() {
        super('TutorialScene');
    }

    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('boton_volver', 'assets/images/boton_volver.png');   
    }
    
    create() {

        this.cameras.main.setBackgroundColor('#91dfeb');

        let globalControls = this.registry.get('controls');

        // Si el jugador va directamente a GameScene sin tocar los controles, los controles por defecto
        // no se inicializan
        if (!globalControls) {
            globalControls = {
                p1: { up: 'W', left: 'A', right: 'D', down: 'S', attack: 'SPACE' },
                p2: { up: 'UP', left: 'LEFT', right: 'RIGHT', down: 'DOWN', attack: 'P' }
            };
            this.registry.set('controls', globalControls);
        }

        this.crearTexto(480, 70, 'Tutorial',  '#000000', '45px');

        // JUGADOR 1
        this.crearTexto(180, 130, 'Jugador 1', '#000000', '35px');

            this.crearBotonNoInteractivo(180, 210, 230, 50, 8, `Saltar: ${this.flechaTecla(globalControls.p1.up)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 270, 230, 50, 8, `Izquierda: ${this.flechaTecla(globalControls.p1.left)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 330, 230, 50, 8, `Derecha: ${this.flechaTecla(globalControls.p1.right)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 390, 230, 50, 8, `Abajo: ${this.flechaTecla(globalControls.p1.down)}`, '#000000', '25px');


        // JUGADOR 2
        this.crearTexto(780, 130, 'Jugador 2', '#000000', '35px');

            this.crearBotonNoInteractivo(780, 210, 230, 50, 8, `Saltar: ${this.flechaTecla(globalControls.p2.up)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 270, 230, 50, 8, `Izquierda: ${this.flechaTecla(globalControls.p2.left)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 330, 230, 50, 8, `Derecha: ${this.flechaTecla(globalControls.p2.right)}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 390, 230, 50, 8,`Abajo: ${this.flechaTecla(globalControls.p2.down)}`, '#000000', '25px');

        // Botón pausa
        this.crearBotonNoInteractivo(480, 300, 230, 50, 8,`Pausa: esc`, '#000000', '25px');

        // Botón comenzar partida
        this.crearBoton(800, 500, 300, 50, 8, 'Comenzar partida', 'GameScene', null, '#000000', '25px');

        // Botón volver al menú
        this.crearBotonDibujo(54, 480, 32, 32, 'MenuScene', null);

    }



}
