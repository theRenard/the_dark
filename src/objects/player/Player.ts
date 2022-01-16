import Game from "../../Game";
import StateMachine from '../../plugins/StateMachine';

// idle
// transition to charge
// charge
// transition down
// run
// jump
// jump to fall trans
// fall
// double slash
// attack 3
// attack 1
// attack
// jump slam
// hit
// blood gif
// death/blood teleport
// heart slam
// blood teleport 2

export default class Player {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private stateMachine: StateMachine

  container: Phaser.GameObjects.Container;

  private keys!: {
    [key: string]: Phaser.Input.Keyboard.Key;
  }
  scene: Game;
  sprite: Phaser.GameObjects.Sprite;
  body: any;
  right!: boolean;
  left!: boolean;
  A_button!: boolean;
  physicsObject: Phaser.GameObjects.Rectangle;
  constructor(scene: Game, x: number, y: number) {
    this.scene = scene;
		this.createAnimations();

    this.stateMachine = new StateMachine(this, 'player');

    this.sprite = this.scene.add.sprite(32, -23, 'king');

    this.physicsObject = this.scene.add.rectangle(0, 0, 32, 32);
    this.scene.physics.add.existing(this.physicsObject);

    this.container = scene.add.container(x + 100, y - 100, [this.sprite, this.physicsObject]);
    this.container.setSize(32, 32);
    this.scene.physics.add.existing(this.container);

    // this.scene.physics.world.enable(this.container);
    // this.physicsBody.setCollideWorldBounds(true);

		this.stateMachine.addState('idle', {
			onEnter: this.idleOnEnter,
			onUpdate: this.idleOnUpdate
		})
		.addState('walk', {
			onEnter: this.walkOnEnter,
			onUpdate: this.walkOnUpdate,
			onExit: this.walkOnExit
		})
    .addState('jump', {
			onEnter: this.jumpOnEnter,
			onUpdate: this.jumpOnUpdate
		})
    .setState('idle')

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // this.joyStickKeys = this.joyStick.createCursorKeys();
    this.keys = {
      space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      one: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      two: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      zero: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
      z: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      m: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      n: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
      l: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
      k: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      j: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    }
    // this.scene.cameras.main.startFollow(this);

  }

  get physicsBody() {
    return this.container.body as Phaser.Physics.Arcade.Body;
  }

  private faceRight() {
    this.sprite.setX(32);
    this.sprite.flipX = false
  }

  private faceLeft() {
    this.sprite.setX(-32);
    this.sprite.flipX = true
  }

	private idleOnEnter() {
    this.sprite.play({ key: 'idle', repeat: -1 }, true);
    this.physicsBody.setVelocityX(0);
	}

	private idleOnUpdate() {
		if (this.left || this.right) this.stateMachine.setState('walk')
		if (this.A_button) this.stateMachine.setState('jump')
	}

	private walkOnEnter() {
    this.sprite.play({ key: 'run', repeat: -1 }, true);
	}

	private walkOnUpdate(){
		const speed = 100

		if (this.left) {
      this.faceLeft()
			this.physicsBody.setVelocityX(-speed)
		} else if (this.right) {
      this.faceRight()
			this.physicsBody.setVelocityX(speed)
		} else {
			this.physicsBody.setVelocityX(0)
			this.stateMachine.setState('idle')
		}

		if (this.A_button) {
			this.stateMachine.setState('jump')
		}
	}

	private walkOnExit() {
		this.sprite.stop()
	}

	private jumpOnEnter() {
    this.sprite.play({ key: 'jump', repeat: -1 }, true);
	}

	private jumpOnUpdate() {
    this.physicsBody.setVelocityY(-120)
    const speed = 100

		if (this.left) {
      this.faceLeft();
			this.physicsBody.setVelocityX(-speed)
		} else if (this.right) {
      this.faceRight();
			this.physicsBody.setVelocityX(speed)
		} else {
      this.stateMachine.setState('idle')
    }
	}

  private createAnimations() {
    this.scene.anims.createFromAseprite('king');
  }

  private updateControls() {
      // const duration = 1000;
      // const up = this.cursors.up?.isDown || this.scene.input.gamepad?.pad1?.leftStick.y < 0 || this.keys.w?.isDown;
      this.right = this.cursors.right?.isDown || this.scene.input.gamepad?.pad1?.leftStick.x > 0 || this.keys.d?.isDown;
      // const down = this.cursors.down?.isDown || this.scene.input.gamepad?.pad1?.leftStick.y > 0 || this.keys.s?.isDown;
      this.left = this.cursors.left?.isDown || this.scene.input.gamepad?.pad1?.leftStick.x < 0 || this.keys.a?.isDown;
      // const prevWeapon = Phaser.Input.Keyboard.JustDown(this.keys.k) || this.scene.input.gamepad?.pad1?.B && !bPressed;
      // const nextWeapon = Phaser.Input.Keyboard.JustDown(this.keys.l) || this.scene.input.gamepad?.pad1?.X && !xPressed;
      this.A_button = Phaser.Input.Keyboard.JustDown(this.keys.space) || this.scene.input.gamepad?.pad1?.A;
      // const longFire = Phaser.Input.Keyboard.DownDuration(this.keys.space, duration) || this.scene.input.gamepad?.pad1?.A;
      // const shield = Phaser.Input.Keyboard.DownDuration(this.keys.z, 10000) || this.scene.input.gamepad?.pad1?.L2;
  }

	update(dt: number) {
    this.updateControls();
		this.stateMachine.update(dt)
	}
}