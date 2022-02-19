import Game from "../../Game";
import gsap from "gsap";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Game) {
    scene.anims.createFromAseprite('bomb_droid');
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = Phaser.Math.Between(0, scene.scale.height - 150);
    super(scene, x, y, 'bomb_droid');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.play({ key: 'drone_Idle', repeat: -1 });
    this.randomnlyMove();
    this.setBodySize(35, 35);
  }

  private move() {
    this.play({ key: 'drone_Move', repeat: -1 });
  }

  private idle() {
    this.play({ key: 'drone_Idle', repeat: -1 });
  }

  private randomnlyMove() {
    this.move();
    const x = Phaser.Math.Between(0, this.scene.scale.width);
    const y = Phaser.Math.Between(0, this.scene.scale.height - 150);
    if (x > this.x) this.setFlipX(false);
    else this.setFlipX(true);
    gsap.to(this, {
      x,
      y,
      duration: Phaser.Math.Between(5, 10),
      ease: 'back.inOut(1.7)',
      callbackScope: this,
      onComplete: () => {
        this.idle();
        setTimeout(() => {
          this.randomnlyMove();
        }, Phaser.Math.Between(1, 3) * 1000);
      }
    });
  }

}