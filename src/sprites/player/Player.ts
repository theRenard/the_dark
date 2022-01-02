import Game from "~/Game";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  private joyStickKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  private keys!: {
    [key: string]: Phaser.Input.Keyboard.Key;
  }
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y, 'player_hidle');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.cursor = scene.input.keyboard.createCursorKeys();
    // this.joyStickKeys = this.joyStick.createCursorKeys();
    this.keys = {
      space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      one: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      two: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      zero: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
      z: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      m: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      n: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
      l: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
      k: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      j: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }
  }

  private hidle() {
    this.setVelocity(0, 0);
    this.anims.play('player_hidle', true);
  }

  private moveRight() {
    this.setFlipX(false);
    this.setVelocityX(150);
    this.anims.play('player_walk', true);
  }

  private moveLeft() {
    this.setFlipX(true);
    this.setVelocityX(-150);
    this.anims.play('player_walk', true);
  }

	preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    // const up = this.keys.w?.isDown;
    const right = this.keys.d?.isDown;
    // const down = this.keys.s?.isDown;
    const left = this.keys.a?.isDown;


    if (right) {
      this.moveRight();
    }
    else if (left) {
      this.moveLeft();
    } else {
      this.hidle()
    }

  }
}