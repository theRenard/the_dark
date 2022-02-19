import { Scene } from 'phaser';
import AnimatedTiles from './plugins/AnimatedTiles';
import Drone from './objects/enemies/Drone';
import Guardian from './objects/enemies/Guardian';
import Player from './objects/player/Player';
import Electricity from './objects/particles/Electricity';
import Rain from './objects/particles/Rain';
import Splash from './objects/particles/Splash';
// import { inspectorScene } form '';
export default class Game extends Scene {
  animatedTiles!: any;
  drone: any;
  player!: Player;
  myCam!: Phaser.Cameras.Scene2D.Camera;
  nearBuildings!: Phaser.GameObjects.Image;
  middleBuildings!: Phaser.GameObjects.Image;
  farBuildings!: Phaser.GameObjects.Image;
  inspectorScene!: { pane: any; };
  guardian!: Guardian;
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

    this.farBuildings = this.add.image(0, 0, 'buildings_far').setOrigin(0, 0).setScrollFactor(0);
    this.middleBuildings = this.add.image(0, 0, 'buildings_middle').setOrigin(0, 0).setScrollFactor(0);
    this.nearBuildings = this.add.image(0, 0, 'buildings_near').setOrigin(0, 0).setScrollFactor(0);

    const map = this.make.tilemap({ key: 'intro_tilemap' });
    const city_tileset = map.addTilesetImage('city', 'city_tileset');
    const cave_tileset = map.addTilesetImage('cave', 'cave_tileset');
    map.createLayer('background', city_tileset);
    map.createLayer('skyline', city_tileset).alpha = 0.4;
    map.createLayer('far skyline', city_tileset).alpha = 0.4;
    new Rain(this);
    new Splash(this, 50, 0, 800, 480 - (32 * 3));
    new Splash(this, 10, 670, 770, 480 - (32 * 6));
    const terrain = map.createLayer('terrain', [cave_tileset, city_tileset]);
    terrain.setCollisionByProperty({ collides: true });

    map.createLayer('fences', city_tileset);
    map.createLayer('buildings/buildings', city_tileset);
    map.createLayer('buildings/buildings deco', city_tileset);
    map.createLayer('trees', city_tileset);
    map.createLayer('electric lines', city_tileset);
    map.createLayer('animations', city_tileset);

    const objectsLayer = map.getObjectLayer('objects');
    objectsLayer.objects.forEach(object => {
      const { x, y, width = 16 } = object;
      if (object.name === 'player' && x && y) {
        this.player = new Player(this, x + (width * 0.5), y);
      }
      if (object.name === 'sparkle' && x && y) {
        new Electricity(this, x + (width * 0.5), y);
      }
      if (object.name === 'sparkle_two' && x && y) {
        new Electricity(this, x + (width * 0.5), y);
      }
    });

    // this.guardian = new Guardian(this, 100, 300);

    const drone = new Drone(this);
    new Drone(this);
    // this.physics.world.collide(this.player.container, terrain);
    this.physics.add.collider(this.player.container, terrain);
    // this.physics.add.collider(this.guardian.container, terrain);
    this.physics.add.collider(drone, terrain);

    this.animatedTiles.init(map);

    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, this.scale.width * 3, this.scale.height);

    // making the camera follow the player
    // this.myCam.startFollow(this.player);

    this.add.dynamicBitmapText(this.scale.width / 2, this.scale.height / 2, 'vermin', 'The_Dark', 60 ).setOrigin(0.5);


  }


  update (time, delta): void {
    // if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
    // this.nearBuildings.x = this.myCam.scrollX * .03;
    // this.middleBuildings.x = this.myCam.scrollX * .06;
    // this.farBuildings.x = this.myCam.scrollX * .09;
    this.player.update(delta);

  }
}