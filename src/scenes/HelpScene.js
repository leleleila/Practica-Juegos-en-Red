import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class HelpScene extends BaseScene {
    constructor() {
        super('HelpScene');
    }

    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
    }

    create() {
       
        this.add.rectangle(480, 270, 960, 540, 0x000000, 0.55);

        // Lista de texto tarjetas 
        this.tarjetas = [
            'OBJETIVO \n\n Recoge armas del escenario \n y pulsa la tecla de ataque \n para matar a tu enemigo y \n ganar la ronda. \n\n (1/3)',
            'CUIDADO \n\nLas olas suben poco a poco \n y reducen el espacio seguro. \n\n (2/3)',
            'POWER-UPS Y VICTORIA\n\nCoge Power-ups para tener ventaja.\nEl jugador que gane más rondas,\n es el ganador de la partida. \n\n (3/3)'
        ];

        this.indiceActual = 0;

        this.tarjeta = this.crearBotonNoInteractivo(480, 240, 620, 280, 8, '', '#000000', '24px');
        this.textoTarjeta = this.tarjeta.list[1];

        // Botón para pasar la tarjeta
        this.btnSiguiente = this.crearBoton(480, 440, 250, 55, 8, '', null, () => {this.avanzarTarjeta(); });

        this.actualizarTarjeta();
    }

    // Actualizar texto de la tarjeta y texto del botón
    actualizarTarjeta() {
        this.textoTarjeta.setText(this.tarjetas[this.indiceActual]);
        this.textoTarjeta.setAlign('center');

        const boton = this.btnSiguiente.list[1];
        if (this.indiceActual === this.tarjetas.length - 1) {
            boton.setText('¡A LUCHAR!');
        } else {
            boton.setText('SIGUIENTE >');
        }
    }

    avanzarTarjeta() {
        if (this.indiceActual < this.tarjetas.length - 1) {
            this.indiceActual++;
            this.actualizarTarjeta();
        } else {
            this.scene.stop();
            this.scene.resume('GameScene');
        }
    }
}