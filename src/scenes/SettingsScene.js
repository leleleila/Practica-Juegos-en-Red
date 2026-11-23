import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class SettingsScene extends BaseScene {
    constructor() {
        super('SettingsScene');
    }

// Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('boton_volver', 'assets/images/boton_volver.png');
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
        this.crearTexto(210, 160, 'VOLUMEN MUSICA', { fontSize: '28px' });
        const volText = this.crearTexto(210, 210, `${Math.round(this.sound.volume * 100)}%`, { fontSize: '32px' });

        // Botón bajar volumen
        this.crearBoton(210 - 130, 210, 70, 55, 8, ' - ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.max(0, +(actual - 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volText.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Botón subir volumen
        this.crearBoton(210 + 130, 210, 70, 55, 8, ' + ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.min(1, +(actual + 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volText.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Volumen efectos de sonido
        this.crearTexto(745, 160, 'VOLUMEN EFECTOS', { fontSize: '28px' });
        const volumen = this.crearTexto(745, 210, `${Math.round(this.sound.volume * 100)}%`, { fontSize: '32px' });

        // Botón bajar volumen
        this.crearBoton(745 - 130, 210, 70, 55, 8, ' - ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.max(0, +(actual - 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volumen.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Botón subir volumen
        this.crearBoton(745 + 130, 210, 70, 55, 8, ' + ', null, () => {
            const actual = this.registry.get('volume');
            const nuevoVol = Math.min(1, +(actual + 0.1).toFixed(1));
            this.sound.volume = nuevoVol;
            this.registry.set('volume', nuevoVol);
            volumen.setText(`${Math.round(nuevoVol * 100)}%`);
        });

        // Botón que lleva a la pantalla de personalizar teclas
        const btnTeclas = this.crearBoton(210, 480, 390, 55, 8, 'PERSONALIZAR TECLAS', 'ControlsScene', null, '#000000');
        btnTeclas.getAt(1).setFontSize('30px');
        

    
      
        if (!this.registry.get('ronda')) {
            this.registry.set('ronda', 3);
        } 

        const minRond = 3;
        const maxRond = 15;

        this.crearTexto(210, 310, 'NUMERO DE RONDAS', 28); 
        const textoRond = this.crearTexto(210, 360, `${this.registry.get('ronda')}`, { fontSize: '32px' });

        this.crearBoton(210 - 130, 360, 70, 55, 8, '-', null,  () => {
            const rondaAct = this.registry.get('ronda');
            const nuevaRonda = Math.max(minRond, rondaAct - 1);
            this.registry.set('ronda', nuevaRonda);
            textoRond.setText(`${nuevaRonda}`);
        }, '#000000');

        this.crearBoton(210 + 130, 360, 70, 55, 8, '+', null, () => {
            const rondaAct = this.registry.get('ronda');
            const nuevaRonda = Math.min(maxRond, rondaAct + 1);
            this.registry.set('ronda', nuevaRonda);
            textoRond.setText(`${nuevaRonda}`);
        }, '#000000');


        //Botón volver al menú
        this.crearBotonDibujo(900, 480, 32, 32, 'MenuScene', null);

    }   
    
}