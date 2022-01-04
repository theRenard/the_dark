export default class Rain {
  rain: Phaser.GameObjects.Particles.ParticleEmitter;
  scene: Phaser.Scene;
  emitter: Phaser.GameObjects.Particles.ParticleEmitterManager;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.emitter = scene.add.particles('spark');
    // const deathZoneRect = new Phaser.Geom.Rectangle(0, 480 - 128, 800, 128);

    // const graphics = this.scene.add.graphics();

    // graphics.lineStyle(1, 0x00ff00, 1);

    // graphics.strokeRectShape(deathZoneRect);


    this.rain = this.emitter.createEmitter({
      x: {min: 0, max: 800},
      y: 0,
      lifespan: {min: 100, max: 400},
      speedY: 1500,
      scaleY: {min: 50, max: 100},
      scaleX: 1,
      quantity: {min: 5, max: 15},
      alpha: 0.1,
      blendMode: 'LIGHTEN',
      // deathZone: { type: 'onEnter', source: deathZoneRect }
    });
  }

  togglePause() {
    if (this.rain.frequency > 0) {
      this.rain.setFrequency(0);
      this.rain.setQuantity(0);
    } else {
      this.rain.setFrequency(50);
      this.rain.setQuantity(1);
    }
  }

}

