import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class GameOverScene extends BaseScene {
    constructor() {
        super('GameOverScene');
    }

    init(data){
        this.score = data.score || {player1: 0, player2: 0}
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
        this.crearTexto(480, 200 , 'GAME OVER', { fontSize: '200px' });

        let textoGanador = '';
        if (this.score.player1 > this.score.player2) {
            textoGanador = 'GANADOR JUGADOR 1';
        } else {
            textoGanador = 'GANADOR JUGADOR 2';
        }

        this.crearTexto(480, 310, textoGanador, {
            fontSize: '60px',
            stroke: '#000000',
            strokeThickness: 6
        });

        // Marcador final
        this.crearTexto(480, 390, `${this.score.player1}  -  ${this.score.player2}`, { fontSize: '42px' });

    this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);
 }
}