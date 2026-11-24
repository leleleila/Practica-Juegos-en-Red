import Phaser from 'phaser';

export class Weapon {
    constructor(scene, x, y) {
        this.scene = scene;
        
        switch(Phaser.Math.Between(0,3))
        {
            case 1:
                this.sprite = scene.physics.add.sprite(x, y, 'katana');
                this.name = 'katana';
                break;
            case 2:
                this.sprite = scene.physics.add.sprite(x, y, 'shuriken');
                this.name = 'shuriken';
                break;
            case 3:
                this.sprite = scene.physics.add.sprite(x, y, 'canon');
                this.name = 'canon';
                break;
            default:
                this.sprite = scene.physics.add.sprite(x, y, 'baston');
                this.name = 'baston';
                break;
        }

        this.sprite.body.setAllowGravity(false);

        this.scene.tweens.add({
            targets: this.sprite,
            y: this.sprite.y -5,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
}