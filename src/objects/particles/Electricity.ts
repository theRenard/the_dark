export default class Electricity {
  electricity: Phaser.GameObjects.Particles.ParticleEmitter;
  scene: Phaser.Scene;
  timer: Phaser.Time.TimerEvent;
  paused = false;
  emitter: Phaser.GameObjects.Particles.ParticleEmitterManager;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.emitter = scene.add.particles('spark');
    this.electricity = this.emitter.createEmitter({
      x: 400,
      y: 300,
      lifespan: {
        min: 500,
        max: 1500,
      },
      angle: {
        min: 90,
        max: 180,
      },
      frequency: 50,
      maxParticles: 100,
      alpha: {
        start: 1,
        end: 0,
      },
      speed: {
        min: -100,
        max: 100,
      },
      gravityY: 200,
      quantity: 1,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });
    this.timer = scene.time.addEvent({
      delay: Phaser.Math.Between(3, 5) * 1000,
      callback: this.togglePause,
      callbackScope: this,
      loop: true,
    });
  }

  togglePause() {
    if (this.electricity.frequency > 0) {
      this.electricity.setFrequency(0);
      this.electricity.setQuantity(0);
    } else {
      this.electricity.setFrequency(50);
      this.electricity.setQuantity(1);
    }
  }

}

