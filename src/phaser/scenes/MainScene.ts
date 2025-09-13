import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private stars?: Phaser.Physics.Arcade.Group;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private score = 0;
  private scoreText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("sky", "http://labs.phaser.io/assets/skies/space3.png");
    this.load.image(
      "ground",
      "http://labs.phaser.io/assets/sprites/platform.png"
    );
    this.load.image("star", "http://labs.phaser.io/assets/sprites/star.png");
    this.load.spritesheet(
      "dude",
      "http://labs.phaser.io/assets/sprites/dude.png",
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );
  }

  create() {
    this.add.image(400, 300, "sky");

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.cursors = this.input.keyboard?.createCursorKeys();

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      const star = child as Phaser.Physics.Arcade.Sprite;
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#FFF",
    });

    if (this.player && this.platforms) {
      this.physics.add.collider(this.player, this.platforms);
    }
    if (this.stars && this.platforms) {
      this.physics.add.collider(this.stars, this.platforms);
    }
    if (this.player && this.stars) {
      this.physics.add.overlap(
        this.player,
        this.stars,
        this.collectStar,
        undefined,
        this
      );
    }
  }

  update() {
    if (!this.cursors || !this.player) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private collectStar(player: any, star: any) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText?.setText("Score: " + this.score);

    if (this.stars?.countActive(true) === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.stars.children.iterate((child: any) => {
        child.enableBody(true, child.x, 0, true, true);
        return true;
      });
    }
  }
}
