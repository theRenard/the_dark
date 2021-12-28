import {
  Scene
} from 'phaser';
import debug from './debug';

export default class Game extends Scene {
  private scoreText!: Phaser.GameObjects.DynamicBitmapText;
  private fpsText!: Phaser.GameObjects.Text;
  constructor() {
    super({
      key: 'game',
      active: false,
    });
  }

  create(): void {
    if (debug) {
      this.fpsText = this.add.text(10, 550, 'FPS: -- \n-- Particles', {
        font: 'bold 26px Arial',
      });
    }
  }


  update (time, delta): void {
    if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
  }
}