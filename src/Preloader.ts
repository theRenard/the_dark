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
    // Tilesets
    this.load.image('city_tileset', 'assets/city_tileset.png');
    this.load.image('cave_tileset', 'assets/cave_tileset.png');
    this.load.image('spark', 'assets/spark.png');
    this.load.image('flower_glow', 'assets/flower_glow.png');
    this.load.tilemapTiledJSON('intro_tilemap', 'maps/intro.json');

    // SpriteSheets
    this.load.aseprite('bomb_droid', 'assets/characters/bomb_droid/bomb_droid.png', 'assets/characters/bomb_droid/bomb_droid.json');

    this.load.spritesheet('player_death', 'assets/characters/player/death.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_hit', 'assets/characters/player/hit.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_walk', 'assets/characters/player/move.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_slam', 'assets/characters/player/slam.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_spin_slam', 'assets/characters/player/spin_slam.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_idle', 'assets/characters/player/static.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_sweep', 'assets/characters/player/sweep.png', {  frameWidth: 88, frameHeight: 30 });
    this.load.spritesheet('player_wake', 'assets/characters/player/wake.png', {  frameWidth: 88, frameHeight: 30 });

  }


  create() {

    this.anims.createFromAseprite('bomb_droid');

    this.anims.create({
      key: 'player_death',
      frames: this.anims.generateFrameNumbers('player_death', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_hit',
      frames: this.anims.generateFrameNumbers('player_hit', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_slam',
      frames: this.anims.generateFrameNumbers('player_slam', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_spin_slam',
      frames: this.anims.generateFrameNumbers('player_spin_slam', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_sweep',
      frames: this.anims.generateFrameNumbers('player_sweep', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_wake',
      frames: this.anims.generateFrameNumbers('player_wake', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });


    const handler = () => this.scene.start('game');
    setTimeout(handler, 100);
  }

}