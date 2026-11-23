import Phaser from 'phaser';

export class PowerUp {
    constructor(scene, x, y) {
        this.scene = scene;
        
        switch(Phaser.Math.Between(0,1))
        {
            case 1:
                this.sprite = scene.physics.add.sprite(x, y, 'speed');
                this.name = 'speed';
                break;
            default:
                this.sprite = scene.physics.add.sprite(x, y, 'shield');
                this.name = 'shield';
                break;
        }

        this.sprite.body.setAllowGravity(false);
    }
}