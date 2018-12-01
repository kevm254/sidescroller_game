import Phaser from 'phaser'

export default class extends Phaser.State {
  preload() {
        game.load.tilemap('level1', '../assets/games/starstruck/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', '../assets/games/starstruck/tiles-1.png');
        game.load.spritesheet('dude', '../assets/games/starstruck/dude.png', 32, 48);
        game.load.spritesheet('droid', '../assets/games/starstruck/droid.png', 32, 48);
        game.load.image('starSmall', '../assets/games/starstruck/star.png');
        game.load.image('starBig', '../assets/games/starstruck/star2.png');
        game.load.image('background', '../assets/games/starstruck/background2.png');
        game.load.audio('theme', ['../assets/audio/time.mp3'])
    }

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let music = game.add.audio('theme');

        game.stage.backgroundColor = '#000000';

        this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        this.bg.fixedToCamera = true;

        this.map = game.add.tilemap('level1');

        this.map.addTilesetImage('tiles-1');
        this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

        this.layer = this.map.createLayer('Tile Layer 1');

        this.layer.resizeWorld();
        this.setupPlayer();

        this.drawUI();


        game.physics.arcade.gravity.y = 250;

        this.player = game.add.sprite(32, 32, 'dude');
        this.enemy = game.add.sprite(100, 100, 'droid');

        game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.setSize(20, 32, 5, 16);
        this.enemy.body.bounce.x = 0;

        this.player.body.bounce.y = 0;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 32, 5, 16);

        this.player.animations.add('left', [ 0, 1, 2, 3 ], 10, true);
        this.player.animations.add('turn', [ 4 ], 20, true);
        this.player.animations.add('right', [ 5, 6, 7, 8 ], 10, true);

        game.camera.follow(this.player);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    collideWithEnemy() {
        if (this.playerInvulnerable !== true) {
            this.takeDamage(2);
            this.hud.setText(`${this.actualPlayerHealth}/${this.maxPlayerHealth}`);

            this.playerInvulnerable = true;
            setTimeout(() => {
                this.playerInvulnerable = false;
            }, 1000);
        }

        this.playerHit = true;
        this.player.body.velocity.x = -250;

        setTimeout(() =>{
            this.playerHit = false;
            this.player.body.velocity.x = 0;
        }, 500);
    }

    takeDamage(number) {
      this.actualPlayerHealth -= number;
    }

    update() {
        this.setupCollisions();
        this.setupControls();
    }

    showGameOver() {
      if (this.playerHealth === 0) {
          game.state.start('GameOver');
      }
    }

    setupCollisions() {
      game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.enemy, this.layer);
        game.physics.arcade.collide(this.player, this.enemy, this.collideWithEnemy.bind(this));
    }

    setupControls() {
        if (!this.playerHit) {
            this.player.body.velocity.x = 0;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;

            if (this.facing !== 'left') {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;

            if (this.facing !== 'right') {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing !== 'idle') {
                this.player.animations.stop();

                if (this.facing === 'left') {
                    this.player.frame = 0;
                } else {
                    this.player.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (this.jumpButton.isDown && this.player.body.onFloor() ) {
            this.player.body.velocity.y = -250;
            this.jumpTimer = game.time.now + 750;
        }
    }

    setupPlayer() {
        this.actualPlayerHealth = 5;
        this.maxPlayerHealth = 5;
    }

    drawUI() {
      const fontSettings = {
          font: "20px Arial",
          fill: "#ff0044",
          align: "center"
      };

      this.ui = game.add.graphics(0, 0);
      this.ui.fixedToCamera = true;
      this.ui.beginFill(0x123457);
      this.ui.lineStyle(5, 0xffd900, 1);
      this.ui.drawRect(10, 10, 100, 50);
      this.hud = game.add.text(15, 15, `${this.actualPlayerHealth}/${this.maxPlayerHealth}`, fontSettings);
      this.hud.fixedToCamera = true;
    }

}