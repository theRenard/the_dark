import Game from "../../Game";
import StateMachine from '../../plugins/StateMachine';
import {
  // AddAnimationState,
  // AddArcadeBody,
  AddGameObject,
  // AddGroup,
  // AddKeys,
  // AddTimerEvent
}  from 'phaser-plugin-inspector';

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
  private stateMachine: StateMachine
  speed = 100;
  container: Phaser.GameObjects.Container;
  scene: Game;
  sprite: Phaser.GameObjects.Sprite;
  body: any;
  right!: boolean;
  left!: boolean;
  JumpButton!: boolean;
  AttackButton!: boolean;
  AttackTwoButton!: boolean;
  AttackThreeButton!: boolean;
  physicsObject: Phaser.GameObjects.Rectangle;
  // SpeedButton: Phaser.Math.Vector2;
  constructor(scene: Game, x: number, y: number) {
    this.scene = scene;

    this.stateMachine = new StateMachine(this, 'player');

    this.sprite = this.scene.add.sprite(32, -23, 'king', 'king_idle');

    this.physicsObject = this.scene.add.rectangle(0, 0, 32, 32);
    this.scene.physics.add.existing(this.physicsObject);

    this.container = scene.add.container(x + 100, y - 100, [this.sprite, this.physicsObject]);
    this.container.setSize(32, 32);
    this.scene.physics.add.existing(this.container);

    // this.scene.physics.world.enable(this.container);
    this.physicsBody.setCollideWorldBounds(true);

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
    .addState('attack', {
			onEnter: this.attackOnEnter,
			onExit: this.attackOnExit,
		})
    .addState('attackTwo', {
			onEnter: this.attackTwoOnEnter,
			onExit: this.attackTwoOnExit,
		})
    .addState('attackThree', {
			onEnter: this.attackThreeOnEnter,
		})
    .addState('fall', {
			onEnter: this.fallOnEnter,
			onUpdate: this.fallOnUpdate
		})
    .setState('idle')


    // this.scene.input.gamepad.on('down', (pad: any) => {});

    // this.scene.cameras.main.startFollow(this);
    // const { pane } = this.scene.inspectorScene;
    // AddGameObject(this.sprite, pane, { title: 'Player' });
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
    this.sprite.play({ key: 'king_idle', repeat: -1 }, true);
    this.physicsBody.setVelocityX(0);
	}

	private idleOnUpdate() {
		if (this.left || this.right) this.stateMachine.setState('walk')
		if (this.JumpButton) this.stateMachine.setState('jump')
    if (this.AttackButton) this.stateMachine.setState('attack')
    if (this.AttackTwoButton) this.stateMachine.setState('attackTwo')
    if (this.AttackThreeButton) this.stateMachine.setState('attackThree')
	}

	private walkOnEnter() {
    this.sprite.play({ key: 'king_run', repeat: -1 }, true);
	}

	private walkOnUpdate(){

		if (this.left) {
      this.faceLeft()
			this.physicsBody.setVelocityX(-this.speed)
		} else if (this.right) {
      this.faceRight()
			this.physicsBody.setVelocityX(this.speed)
		} else {
			this.physicsBody.setVelocityX(0)
			this.stateMachine.setState('idle')
		}

		if (this.JumpButton) this.stateMachine.setState('jump')
    if (this.AttackButton) this.stateMachine.setState('attack')
    if (this.AttackTwoButton) this.stateMachine.setState('attackTwo')
    if (this.AttackThreeButton) this.stateMachine.setState('attackThree')
	}

	private walkOnExit() {
    this.physicsBody.setVelocityX(0);
		this.sprite.stop()
	}

	private jumpOnEnter() {
    this.sprite.play({ key: 'king_jump', repeat: -1 }, true);
	}

	private jumpOnUpdate() {
    this.physicsBody.setVelocityY(-300)

		if (this.left) {
      this.faceLeft();
			this.physicsBody.setVelocityX(-this.speed)
		} else if (this.right) {
      this.faceRight();
			this.physicsBody.setVelocityX(this.speed)
		}

    if (!this.JumpButton) {
			this.stateMachine.setState('fall')
		}

    // don't jump too high
    if (this.physicsBody.y < 300) {
      this.stateMachine.setState('fall')
    }
	}

  private attackOnEnter() {
    this.sprite.play({
      key: 'king_attack_0',
      repeat: 0,

     }, true).on('animationcomplete', () => {
        this.stateMachine.setState('idle')
      })
  }

  private attackOnExit() {
    if (this.sprite.flipX) this.container.setX(this.container.x - 57)
    else this.container.setX(this.container.x + 57)
  }

  private attackTwoOnEnter() {
    this.sprite.play({
      key: 'king_attack_1',
      repeat: 0,

     }, true).on('animationcomplete', () => {
        this.stateMachine.setState('idle')
      })
  }

  private attackTwoOnExit() {
    if (this.sprite.flipX) this.container.setX(this.container.x - 45)
    else this.container.setX(this.container.x + 45)
  }
  private attackThreeOnEnter() {
    this.sprite.play({
      key: 'king_attack_3',
      repeat: 0,

     }, true).on('animationcomplete', () => {
        this.stateMachine.setState('idle')
      })
  }

  // private attackThreeOnExit() {
  // }

  private fallOnEnter() {
    this.sprite.play({ key: 'king_fall', repeat: -1 }, true);
    this.physicsBody.setVelocityY(100)
  }

  private fallOnUpdate() {
    if (this.left) {
      this.faceLeft();
    } else if (this.right) {
      this.faceRight();
    }

    // when the player is on the ground
    if (this.physicsBody.blocked.down) {
      this.stateMachine.setState('idle');
    }

  }

  private updateControls() {
      // const duration = 1000;
      // const up = this.cursors.up?.isDown || this.scene.input.gamepad?.pad1?.leftStick.y < 0 || this.keys.w?.isDown;
      this.right = this.scene.input.gamepad?.pad1?.leftStick.x > 0;
      // const down = this.cursors.down?.isDown || this.scene.input.gamepad?.pad1?.leftStick.y > 0 || this.keys.s?.isDown;
      this.left = this.scene.input.gamepad?.pad1?.leftStick.x < 0;
      // const prevWeapon = Phaser.Input.Keyboard.JustDown(this.keys.k) || this.scene.input.gamepad?.pad1?.B && !bPressed;
      // const nextWeapon = Phaser.Input.Keyboard.JustDown(this.keys.l) || this.scene.input.gamepad?.pad1?.X && !xPressed;
      this.JumpButton = this.scene.input.gamepad.pad1?.A;
      this.AttackButton = this.scene.input.gamepad.pad1?.B;
      this.AttackTwoButton = this.scene.input.gamepad.pad1?.X;
      this.AttackThreeButton = this.scene.input.gamepad.pad1?.Y;
      if (this.scene.input.gamepad.pad1?.R1) this.speed = 200;
      else this.speed = 100;
      // const longFire = Phaser.Input.Keyboard.DownDuration(this.keys.space, duration) || this.scene.input.gamepad?.pad1?.A;
      // const shield = Phaser.Input.Keyboard.DownDuration(this.keys.z, 10000) || this.scene.input.gamepad?.pad1?.L2;
  }

	update(dt: number) {
    this.updateControls();
		this.stateMachine.update(dt)
	}
}