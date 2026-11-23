import Phaser from 'phaser';

export class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.fuentePrincipal = '"Minecraft", monospace';
    }

    crearTexto(x, y, contenido, color = '#000000', tamanoFuente = '28px', estilo = {}) {
        return this.add.text(x, y, contenido, {
            fontFamily: this.fuentePrincipal,
            fontSize: tamanoFuente,
            color: color,
            ...estilo
        }).setOrigin(0.5);
    }

    crearBoton = (x, y, ancho, alto, margen, texto, escenaDestino, onClick = null,
        colorTexto = '#000000', tamanoFuente = '32px') => {
        const sprite = this.add.nineslice(
            0, 0,
            'boton_sencillo',
            null,
            ancho,
            alto,
            margen, // izq
            margen, // dcha
            margen, // arriba
            margen  // abajo
        );

        const label = this.add.text(0, 0, texto, {
            fontFamily: this.fuentePrincipal,
            fontSize: tamanoFuente,
            color: colorTexto
        }).setOrigin(0.5);

        const btn = this.add.container(x, y, [sprite, label])
            .setSize(ancho, alto)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                sprite.setTint(0xdddddd);
                label.setStyle({ color: '#00d5ff' });
            })
            .on('pointerout', () => {
                sprite.clearTint();
                label.setStyle({ color: colorTexto });
                label.setY(0);
            })
            .on('pointerdown', () => {
                label.setY(2);
                if (typeof onClick === 'function') {
                    onClick();
                }
                if (escenaDestino) {
                    this.scene.start(escenaDestino);
                }
            });

        return btn;
    };

    crearBotonDibujo = (x, y, ancho, alto, escenaDestino, onClick = null) => {

        const sprite = this.add.sprite(
            0, 0,
            'boton_volver',
            null,
            ancho,
            alto,

        );
        const btn = this.add.container(x, y, [sprite])
            .setSize(ancho, alto)
            .setInteractive({ useHandCursor: true })
            .setScale(2.5)
            .on('pointerover', () => {
                sprite.setTint(0xdddddd);

            })
            .on('pointerout', () => {
                sprite.clearTint();

            })
            .on('pointerdown', () => {

                if (typeof onClick === 'function') {
                    onClick();
                }
                if (escenaDestino) {
                    this.scene.start(escenaDestino);
                }
            });
    }

    crearBotonNoInteractivo = (x, y, ancho, alto, margen, texto, colorTexto = '#000000', tamanoFuente = '32px') => {
        const spriteFondo = this.add.nineslice(
            0, 0,
            'boton_sencillo',
            null,
            ancho,
            alto,
            margen, // izq
            margen, // dcha
            margen, // arriba
            margen  // abajo
        );

        const label = this.add.text(0, 0, texto, {
            fontFamily: this.fuentePrincipal,
            fontSize: tamanoFuente,
            color: colorTexto
        }).setOrigin(0.5);

        return this.add.container(x, y, [spriteFondo, label]);
    };

}