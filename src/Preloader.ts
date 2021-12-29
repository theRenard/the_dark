import { Scene } from 'phaser';

export default class Preload extends Scene {

  constructor() {
    super({
      key: 'preloader',
      active: true,
    });
  }

  preload() {
    this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading Images' ).setOrigin(0.5);
    this.load.image('city_tileset', 'assets/city_tileset.png');
    this.load.image('cave_tileset', 'assets/cave_tileset.png');
    this.load.image('flower_glow', 'assets/flower_glow.png');
    this.load.tilemapTiledJSON('intro_tilemap', 'maps/intro.json');
  }


  create() {
    const handler = () => this.scene.start('game');
    setTimeout(handler, 1000);
  }

}