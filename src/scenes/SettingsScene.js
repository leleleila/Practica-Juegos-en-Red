import Phaser from 'phaser';

export class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create(){

        this.add.text(480,70,'AJUSTES', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        //Control de volumen
        //guardamos el volumen en el registro global de Phaser
        if(this.registry.get('volume')===undefined){
            this.registry.set('volume',0.5);
        }
        this.sound.volume = this.registry.get('volume');

        this.add.text(480, 160, 'Volumen Música', {
            fontSize: '28px',
            color: '#cccccc'
        }).setOrigin(0.5);

        const volText = this.add.text(480, 210, `${Math.round(this.sound.volume * 100)}%`, {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5);

        //botón de bajar el volumen
        const minusBtn = this.crearBoton(480 - 100, 210, ' - ', () => {
            let newVol = Math.max(0, +(this.sound.volume - 0.1).toFixed(1));
            this.sound.volume = newVol;
            this.registry.set('volume', newVol);
            volText.setText(`${Math.round(newVol * 100)}%`);
        });

        //botón de subir el volumen
        const subir = this.crearBoton(480 + 100, 210, ' + ', () => {
            let newVol = Math.min(1, +(this.sound.volume + 0.1).toFixed(1));
            this.sound.volume = newVol;
            this.registry.set('volume', newVol);
            volText.setText(`${Math.round(newVol * 100)}%`);
        });

        this.crearBoton(480, 420, 'Volver al Menú', () => {
            this.scene.start('MenuScene');
        }, '#ff5555');
    }

    crearBoton(x, y, texto, callback, colorNormal = '#ffffff') {
        const btn = this.add.text(x, y, texto, {
            fontSize: '28px',
            color: colorNormal,
            backgroundColor: '#222222',
            padding: { x: 15, y: 8 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => btn.setStyle({ color: '#ffff00' }))
        .on('pointerout', () => btn.setStyle({ color: colorNormal }))
        .on('pointerdown', callback);

        return btn;

    }
}