import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(480, 140, 'Rivals Through Ages', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const localBtn = this.add.text(480, 280, 'Local Play', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => this.scene.start('GameScene'));

        const settingsBtn = this.add.text(480, 350, 'Ajustes', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => settingsBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => settingsBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('SettingsScene'));
    }
}
