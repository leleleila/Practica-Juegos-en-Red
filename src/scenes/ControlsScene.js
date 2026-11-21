import Phaser from 'phaser';
import { BaseScene } from './BaseScene.js';

export class ControlsScene extends BaseScene {
    constructor() {
        super('ControlsScene');
    }

    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
    }

    create() {
        // Color de fondo
        this.cameras.main.setBackgroundColor('#91dfeb');

        // Título
        this.crearTexto(480, 55, 'CONTROLES', '#000000', { fontSize: '46px' });
        this.crearTexto(480, 105, 'Haz clic en un boton y pulsa la nueva tecla', '#000000', { fontSize: '20px' });

        // Inicializamos los controles por defecto ya que gameScene (donde se inicializan si no se cambian aqui) no se ha ejecutado todavia
        if (!this.registry.get('controls')) {
            this.registry.set('controls', {
                p1: { up: 'W', left: 'A', right: 'D' },
                p2: { up: 'UP', left: 'LEFT', right: 'RIGHT' }
            });
        }
        const controles = this.registry.get('controls');

        // Columna para cada jugador
        this.crearTexto(270, 165, 'Jugador 1', '#000000', { fontSize: '28px' });
        this.crearTexto(690, 165, 'Jugador 2', '#000000', { fontSize: '28px' });

        // Botones Jugador 1 (columna izq)
        this.crearBotonTecla(270, 230, 'Saltar', 'p1', 'up', controles);
        this.crearBotonTecla(270, 300, 'Izq', 'p1', 'left', controles);
        this.crearBotonTecla(270, 370, 'Der', 'p1', 'right', controles);

        // Botones Jugador 2 (columna dch)
        this.crearBotonTecla(690, 230, 'Saltar', 'p2', 'up', controles);
        this.crearBotonTecla(690, 300, 'Izq', 'p2', 'left', controles);
        this.crearBotonTecla(690, 370, 'Der', 'p2', 'right', controles);

        // Botón volver a Ajustes
        this.crearBoton(480, 475, 280, 60, 8, 'Volver', 'SettingsScene', null, '#000000');
    }


    crearBotonTecla(x, y, accion, jugador, direccion, controles) {
        const boton = this.crearBoton(
            x, y, 310, 54, 8,
            `${accion}: ${controles[jugador][direccion]}`,
            null, //null como escena de destino, para no cambiar de escena
            () => {
                const texto = boton.getAt(1);
                texto.setText(`${accion}: ...`);

                this.input.keyboard.once('keydown', (event) => {
                    const nuevaTecla = this.formatearTecla(event);
                    controles[jugador][direccion] = nuevaTecla;
                    this.registry.set('controls', controles);
                    texto.setText(`${accion}: ${nuevaTecla}`);
                });
            }
        );

        boton.getAt(1).setFontSize('22px');
    }

    //para traducir la tecla pulsada para q phaser lo entienda
    formatearTecla(event) {
        if (event.code === 'Space') return 'SPACE';
        if (event.key.startsWith('Arrow')) return event.key.replace('Arrow', '').toUpperCase();
        return event.key.toUpperCase();
    }
}