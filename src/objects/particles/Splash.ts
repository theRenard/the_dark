export default class Splash {
  scene: Phaser.Scene;
  emitter: Phaser.GameObjects.Particles.ParticleEmitterManager;
  constructor(scene: Phaser.Scene, quantity = 1, x1: number, x2: number, y: number) {
    this.scene = scene;

    this.emitter = scene.add.particles('spark');

    const emitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

    for (let i = 0; i < quantity; i++) {
      emitters.push(this.emitter.createEmitter({
          x: Phaser.Math.Between(x1, x2),
          y,
          delay: Phaser.Math.Between(0, 1000),
          lifespan: {
            min: Phaser.Math.Between(0, 150),
            max: Phaser.Math.Between(150, 350),
          },
          angle: {
            min: -180,
            max: 0,
          },
          frequency: 150,
          alpha: {
            start: 1,
            end: 0,
          },
          speed: {
            min: 10,
            max: 50,
          },
          gravityY: -200,
          quantity: 5,
          scale: { start: 1, end: 0 },
          blendMode: 'LIGHTEN',
          visible: false,
        })
      );
    }

    emitters.forEach((emitter, i) => {
      this.emitter.addEmitter(emitter);
      setInterval(() => {
        if (emitter.visible) {
          emitter.visible = false;
        } else {
          emitter.visible = true;
        }
      }, Phaser.Math.Between(0, 300 * i));

    });
  }
}

