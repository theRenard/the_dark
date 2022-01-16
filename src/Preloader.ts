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

    // fonts
    this.load.bitmapFont('vermin', 'assets/fonts/vermin.png', 'assets/fonts/vermin.xml');

    // this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading Images' ).setOrigin(0.5);
    // Tilesets
    this.load.image('fog', 'assets/images/fog.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('city_tileset', 'assets/images/city_tileset.png');
    this.load.image('cave_tileset', 'assets/images/cave_tileset.png');
    this.load.image('spark', 'assets/images/spark.png');
    this.load.image('flower_glow', 'assets/images/flower_glow.png');
    this.load.tilemapTiledJSON('intro_tilemap', 'assets/maps/intro.json');

    // Aseprites
    this.load.aseprite('bomb_droid', 'assets/images/characters/bomb_droid/bomb_droid.png', 'assets/images/characters/bomb_droid/bomb_droid.json');
    // this.load.aseprite('assassin', 'assets/images/characters/assassin/assassin.png', 'assets/images/characters/assassin/assassin.json');
    // this.load.aseprite('blaster', 'assets/images/characters/blaster/blaster.png', 'assets/images/characters/blaster/blaster.json');
    // this.load.aseprite('dagger', 'assets/images/characters/dagger/dagger.png', 'assets/images/characters/dagger/dagger.json');
    // this.load.aseprite('guardian', 'assets/images/characters/guardian/guardian.png', 'assets/images/characters/guardian/guardian.json');
    this.load.aseprite('king', 'assets/images/characters/king/king.png', 'assets/images/characters/king/king.json');
    // this.load.aseprite('slicer', 'assets/images/characters/slicer/slicer.png', 'assets/images/characters/slicer/slicer.json');

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