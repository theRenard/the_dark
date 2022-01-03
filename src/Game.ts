import { Scene } from 'phaser';
import AnimatedTiles from './plugins/AnimatedTiles';
import Drone from './objects/enemies/Drone';
import Player from './objects/player/Player';
import Electricity from './objects/particles/Electricity';
export default class Game extends Scene {

  animatedTiles!: any;
  drone: any;
  player: any;
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

    const player = new Player(this, 350, 350);
    const drone = new Drone(this);
    new Drone(this);
    new Electricity(this);
    // this.physics.world.collide(player, terrain);
    this.physics.add.collider(player, terrain);
    this.physics.add.collider(drone, terrain);

    this.animatedTiles.init(map);

  }


  update (time, delta): void {
    // if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
  }
}