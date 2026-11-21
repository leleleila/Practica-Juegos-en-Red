import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class SettingsScene extends BaseScene {
    constructor() {
        super('SettingsScene');
    }

// Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
    }

    create(){

        // Color fondo
        this.cameras.main.setBackgroundColor('#91dfeb');

        // Título ajustes
        this.crearTexto(480, 70, 'AJUSTES', { fontSize: '48px' });

        // Control de volumen
        // Guardamos el volumen en el registro global de Phaser
        if(this.registry.get('volume')===undefined){
            this.registry.set('volume',0.5);
        }
        this.sound.volume = this.registry.get('volume');

        // Volumen música
        this.crearTexto(480, 160, 'Volumen Musica', { fontSize: '28px' });
        const volText = this.crearTexto(480, 210, `${Math.round(this.sound.volume * 100)}%`, { fontSize: '32px' });

        // Botón bajar volumen
        this.crearBoton(480 - 130, 210, 70, 56, 8, ' - ', null, () => {
            const newVol = Math.max(0, +(this.sound.volume - 0.1).toFixed(1));
            this.sound.volume = newVol;
            this.registry.set('volume', newVol);
            volText.setText(`${Math.round(newVol * 100)}%`);
        });

        // Botón subir volumen
        this.crearBoton(480 + 130, 210, 70, 56, 8, ' + ', null, () => {
            const newVol = Math.min(1, +(this.sound.volume + 0.1).toFixed(1));
            this.sound.volume = newVol;
            this.registry.set('volume', newVol);
            volText.setText(`${Math.round(newVol * 100)}%`);
        });

        // Botón volver al menú
        this.crearBoton(480, 420, 280, 64, 8, 'Volver al Menu', 'MenuScene', null, '#000000');
    }

    
}