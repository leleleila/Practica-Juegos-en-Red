import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class PauseScene extends BaseScene {
    constructor() {
        super('PauseScene');
    }

    create() {
        this.add.rectangle(480, 270, 800, 600, 0x000000, 0.7);
        
        // Título juego pausado
       this.crearTexto(480, 200 , 'Juego Pausado', '#ffffff', '50px');

        // Botón reanudar
        this.crearBoton(480, 320, 320, 64, 8, 'Reanudar', null, () => {
            this.scene.resume('GameScene');
            this.scene.stop();
        }, '#000000');

        // Botón volver al menú
        this.crearBoton(480, 410, 320, 64, 8, 'Volver al menu', null, () => {
            this.scene.stop('GameScene');
            this.scene.stop();
            this.scene.start('MenuScene');
        }, '#000000');

    }
}
