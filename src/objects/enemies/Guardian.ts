import Game from "../../Game";
import StateMachine from '../../plugins/StateMachine';

// walk
// attack
// attack 2
// special
// return to stance
// hit
// death

export default class Player {
  private stateMachine: StateMachine
  speed = 100;
  container: Phaser.GameObjects.Container;
  scene: Game;
  sprite: Phaser.GameObjects.Sprite;
  body: any;

  physicsObject: Phaser.GameObjects.Rectangle;
  // SpeedButton: Phaser.Math.Vector2;

  constructor(scene: Game, x: number, y: number) {
    this.scene = scene;

    this.stateMachine = new StateMachine(this, 'guardian');

    this.sprite = this.scene.add.sprite(32, -23, 'guardian');

    this.physicsObject = this.scene.add.rectangle(0, 0, 32, 32);
    this.scene.physics.add.existing(this.physicsObject);

    this.container = scene.add.container(x + 100, y - 100, [this.sprite, this.physicsObject]);
    this.container.setSize(32, 32);
    this.scene.physics.add.existing(this.container);

    // this.scene.physics.world.enable(this.container);
    this.physicsBody.setCollideWorldBounds(true);

		this.stateMachine.addState('idle', {
			onEnter: this.idleOnEnter,
			// onUpdate: this.idleOnUpdate
		})
    .setState('idle')


    // this.scene.input.gamepad.on('down', (pad: any) => {});

    // this.scene.cameras.main.startFollow(this);
  }

  get physicsBody() {
    return this.container.body as Phaser.Physics.Arcade.Body;
  }

  // private faceRight() {
  //   this.sprite.setX(32);
  //   this.sprite.flipX = false
  // }

  // private faceLeft() {
  //   this.sprite.setX(-32);
  //   this.sprite.flipX = true
  // }

	private idleOnEnter() {
    this.sprite.play({ key: 'idle', repeat: -1 }, true);
    this.physicsBody.setVelocityX(0);
	}

	// private idleOnUpdate() {
	// }

  updateControls() {
  }

	update(dt: number) {
    this.updateControls();
		this.stateMachine.update(dt)
	}

}