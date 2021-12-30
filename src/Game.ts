import { Scene } from 'phaser';
import AnimatedTiles from './plugins/AnimatedTiles';

export default class Game extends Scene {

  animatedTiles!: any;
  drone: any;
  constructor() {
    super({
      key: 'game',
      active: false,
    });
  }

  preload(): void {
    this.load.scenePlugin('AnimatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
  }


  create(): void {
    const map = this.make.tilemap({ key: 'intro_tilemap' });
    const city_tileset = map.addTilesetImage('city', 'city_tileset');
    const cave_tileset = map.addTilesetImage('cave', 'cave_tileset');
    map.createLayer('background', city_tileset);
    map.createLayer('skyline', city_tileset).alpha = 0.4;
    map.createLayer('far skyline', city_tileset).alpha = 0.4;
    const terrain = map.createLayer('terrain', [cave_tileset, city_tileset]);
    terrain.setCollisionByProperty({ collides: true });
    map.createLayer('fences', city_tileset);
    map.createLayer('buildings/buildings', city_tileset);
    map.createLayer('buildings/buildings deco', city_tileset);
    map.createLayer('trees', city_tileset);
    map.createLayer('electric lines', city_tileset);
    map.createLayer('animations', city_tileset);

    this.animatedTiles.init(map);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bomb_droid_idle', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

    this.drone = this.physics.add.sprite(100, 100, 'bomb_droid_idle');

  }


  update (time, delta): void {
    this.drone.anims.play('idle', true);
    // if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
  }
}