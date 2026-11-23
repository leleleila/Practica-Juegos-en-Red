import Phaser from 'phaser';

export class Weapon {
    constructor(scene, x, y) {
        this.scene = scene;
        
        switch(Phaser.Math.Between(0,1))
        {
            case 1:
                this.sprite = scene.physics.add.sprite(x, y, 'katana');
                this.name = 'katana';
                break;
            default:
                this.sprite = scene.physics.add.sprite(x, y, 'baston');
                this.name = 'baston';
                break;
        }

        this.sprite.body.setAllowGravity(false);
    }
}