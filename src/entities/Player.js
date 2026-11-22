export class Player {

    constructor(scene, id, x, y) {
        this.id = id;
        this.scene = scene;
        this.speed = 300;
        this.deaths = 0;

        this.sprite = scene.physics.add.sprite(x, y, 'player', 'tilemap-characters_packed_0');
        this.sprite.body.setSize(32, 32);
        this.sprite.setCollideWorldBounds(false);
}
}