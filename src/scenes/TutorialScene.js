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

            // Si los controles del jugador son las flechas de dirección, sustituimos el nombre por el símbolo de flecha correspondiente
            let p1Up = globalControls.p1.up;
            if(p1Up === 'UP') {p1Up =  "↑";}

            let p1Left = globalControls.p1.left;
            if(p1Left === 'LEFT') {p1Left =  "←";}

            let p1Right = globalControls.p1.right;
            if(p1Right === 'RIGHT') {p1Right =  "→";}

            let p1Down = globalControls.p1.down;
            if(p1Down === 'DOWN') {p1Down =  "↓";}

            this.crearBotonNoInteractivo(180, 210, 230, 50, 8, `Saltar: ${p1Up}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 270, 230, 50, 8, `Izquierda: ${p1Left}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 330, 230, 50, 8, `Derecha: ${p1Right}`, '#000000', '25px');
            this.crearBotonNoInteractivo(180, 390, 230, 50, 8, `Abajo: ${p1Down}`, '#000000', '25px');


        // JUGADOR 2
        this.crearTexto(780, 130, 'Jugador 2', '#000000', '35px');

            // Si los controles del jugador son las flechas de dirección, sustituimos el nombre por el símbolo de flecha correspondiente
            let p2Up = globalControls.p2.up;
            if(p2Up === 'UP') {p2Up =  "↑";}

            let p2Left = globalControls.p2.left;
            if(p2Left === 'LEFT') {p2Left =  "←";}

            let p2Right = globalControls.p2.right;
            if(p2Right === 'RIGHT') {p2Right =  "→";}

            let p2Down = globalControls.p2.down;
            if(p2Down === 'DOWN') {p2Down =  "↓";}

            this.crearBotonNoInteractivo(780, 210, 230, 50, 8, `Saltar: ${p2Up}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 270, 230, 50, 8, `Izquierda: ${p2Left}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 330, 230, 50, 8, `Derecha: ${p2Right}`, '#000000', '25px');
            this.crearBotonNoInteractivo(780, 390, 230, 50, 8, `Abajo: ${p2Down}`, '#000000', '25px');

        // Botón comenzar partida
        this.crearBoton(800, 500, 300, 50, 8, 'Comenzar partida', 'GameScene', null, '#000000', '25px');

        // Botón volver al menú
        this.crearBotonDibujo(54, 480, 32, 32, 'MenuScene', null);

    }



}
