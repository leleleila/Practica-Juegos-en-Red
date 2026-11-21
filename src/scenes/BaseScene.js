import Phaser from 'phaser';

export class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.fuentePrincipal = '"Minecraft", monospace';
    }

    crearTexto(x, y, contenido, color = '#000000', estilo = {}){
        return this.add.text(x, y, contenido, {
            fontFamily: this.fuentePrincipal,
            fontSize: '28px',
            color: color,
            ...estilo
        }).setOrigin(0.5);
    }

    crearBoton = (x, y, ancho, alto, margen, texto, escenaDestino, onClick = null, colorTexto = '#000000') => {
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
        fontFamily: this.fuentePrincipal,
        fontSize: '32px',
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

    }