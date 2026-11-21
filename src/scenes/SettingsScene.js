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
            this.registry.set('volume', 1);
        }
        this.sound.volume = this.registry.get('volume');

        // Volumen música
        this.crearTexto(480, 160, 'Volumen Musica', { fontSize: '28px' });
        const volText = this.crearTexto(480, 210, `${Math.round(this.sound.volume * 100)}%`, { fontSize: '32px' });

        // Botón bajar volumen
        this.crearBoton(480 - 130, 210, 70, 56, 8, ' - ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.max(0, +(actual - 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volText.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Botón subir volumen
        this.crearBoton(480 + 130, 210, 70, 56, 8, ' + ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.min(1, +(actual + 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volText.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Botón que lleva a la pantalla de personalizar teclas
        const btnTeclas = this.crearBoton(480, 320, 440, 64, 8, 'Cambiar teclas de control', 'ControlsScene', null, '#000000');
        btnTeclas.getAt(1).setFontSize('24px');

        // Botón volver al menú
        this.crearBoton(480, 430, 280, 64, 8, 'Volver al Menu', 'MenuScene', null, '#000000');

    }

       
    

    
}