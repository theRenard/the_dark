import { Scene } from 'phaser';
import Buildings from './objects/others/Buildings';
export default class Preload extends Scene {

  constructor() {
    super({
      key: 'preloader',
      active: true,
    });
  }

  preload() {

    this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading Images' ).setOrigin(0.5);
    // Tilesets
    this.load.image('fog', 'assets/fog.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('city_tileset', 'assets/city_tileset.png');
    this.load.image('cave_tileset', 'assets/cave_tileset.png');
    this.load.image('spark', 'assets/spark.png');
    this.load.image('flower_glow', 'assets/flower_glow.png');
    this.load.tilemapTiledJSON('intro_tilemap', 'maps/intro.json');

    // Aseprites
    this.load.aseprite('bomb_droid', 'assets/characters/bomb_droid/bomb_droid.png', 'assets/characters/bomb_droid/bomb_droid.json');
    // this.load.aseprite('assassin', 'assets/characters/assassin/assassin.png', 'assets/characters/assassin/assassin.json');
    // this.load.aseprite('blaster', 'assets/characters/blaster/blaster.png', 'assets/characters/blaster/blaster.json');
    // this.load.aseprite('dagger', 'assets/characters/dagger/dagger.png', 'assets/characters/dagger/dagger.json');
    // this.load.aseprite('guardian', 'assets/characters/guardian/guardian.png', 'assets/characters/guardian/guardian.json');
    this.load.aseprite('king', 'assets/characters/king/king.png', 'assets/characters/king/king.json');
    // this.load.aseprite('slicer', 'assets/characters/slicer/slicer.png', 'assets/characters/slicer/slicer.json');

    // create the buildings
    const { near, middle, far } = new Buildings(this).textures;
    near.generateTexture('buildings_near', this.scale.width, this.scale.height);
    middle.generateTexture('buildings_middle');
    far.generateTexture('buildings_far');
  }

  create() {

    this.anims.createFromAseprite('bomb_droid');
    // this.anims.createFromAseprite('assassin');
    // this.anims.createFromAseprite('blaster');
    // this.anims.createFromAseprite('dagger');
    // this.anims.createFromAseprite('guardian');
    // this.anims.createFromAseprite('slicer');

    const handler = () => this.scene.start('game');
    setTimeout(handler, 100);
  }

}