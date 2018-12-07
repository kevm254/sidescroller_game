export default class Bullet  {
    constructor(game, options) {
        this.game = game;
        this.options = options;
    }
    setup(options) {
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = this.options.physicsType;
        
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);

        this.sprite = this.game.add.sprite(400, 300, 'arrow');
        this.sprite.anchor.set(0.5);

        this.game.physics.enable(this.sprite, this.options.physicsType);
        this.sprite.body.allowRotation = false;
    }
}