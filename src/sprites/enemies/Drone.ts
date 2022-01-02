import Game from "../../Game";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Game) {
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = Phaser.Math.Between(0, scene.scale.height - 100);
    super(scene, x, y, 'bomb_droid_idle');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);


  }

	preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.anims.play('bomb_droid_idle', true);

  }
}