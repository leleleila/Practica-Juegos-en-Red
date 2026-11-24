export class Player {

    constructor(scene, id, x, y, spriteSheetKey) {
        this.id = id;
        this.scene = scene;
        this.speed = 300;

        this.hitbox = null;
        this.isAttacking = false;
        this.isHit = false;
        this.isInvincible = false;

        this.weapon = 'null';

        this.sprite = scene.physics.add.sprite(x, y, spriteSheetKey, 0);
        this.sprite.body.setSize(13, 27);
        this.sprite.body.setOffset(20,12);
        this.sprite.setCollideWorldBounds(false);
    }
}