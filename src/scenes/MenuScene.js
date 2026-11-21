import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    // Cargamos sprites
    preload() {
        this.load.image('boton_sencillo', 'assets/images/botonsupersencillo.png');
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor('#d6d6d6');

        // Título

        this.add.image(480, 110, 'logo').setOrigin(0.5);

        /*
        this.add.text(480, 140, 'Rivals Through Ages', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);
        */
        

        const crearBoton = (x, y, ancho, alto, margen, texto, escenaDestino) => {

            const sprite = this.add.nineslice(
                0, 0,
                'boton_sencillo',
                null,
                ancho,
                alto,
                margen, // izq
                margen, // drcha
                margen, // arriba
                margen  // abajo
            );


            const label = this.add.text(0, 0, texto, {
                fontSize: '32px',
                color: '#00ff00'
            }).setOrigin(0.5);

            const btn = this.add.container(x, y, [sprite, label])
                .setSize(ancho, alto)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => {
                    sprite.setTint(0xdddddd);
                    label.setStyle({ color: '#ffff00' });
                })
                .on('pointerout', () => {
                    sprite.clearTint();
                    label.setStyle({ color: '#00ff00' });
                    label.setY(0);
                })
                .on('pointerdown', () => {
                    label.setY(2);
                    this.scene.start(escenaDestino);
                });

            return btn;
        };

        crearBoton(480, 270, 260, 68, 8, 'Juego Local', 'GameScene');
        crearBoton(480, 380, 260, 68, 8, 'Ajustes', 'SettingsScene');

    }
}