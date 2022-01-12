export default class Buildings {

  private scene: Phaser.Scene;
  private colors = [0x0b0a0b, 0x141314, 0x262326, 0x322f33]
  textures!: { near: Phaser.GameObjects.Graphics; middle: Phaser.GameObjects.Graphics; far: Phaser.GameObjects.Graphics; };
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createRandomBuildings();
  }



  private createRandomBuildings() {
    // create random buildings

    const near = this.scene.make.graphics({ x: 0, y: 0, add: false })
    const middle = this.scene.make.graphics({ x: 0, y: 0, add: false })
    const far = this.scene.make.graphics({ x: 0, y: 0, add: false })

    near.fillStyle(this.colors[3], 1);

    for (let i = 0; i < Phaser.Math.Between(50, 100); i++) {
      const width = Phaser.Math.Between(40, 70);
      const height = Phaser.Math.Between(20, this.scene.scale.height - 150);
      const x = Phaser.Math.Between(-100, this.scene.scale.width + 100)
      const y = this.scene.scale.height - height;
      near.fillRect(x, y, width, height);
    }

    middle.fillStyle(this.colors[2], 1);

    for (let i = 0; i < Phaser.Math.Between(20, 30); i++) {
      const width = Phaser.Math.Between(300, 500);
      const height = Phaser.Math.Between(0, this.scene.scale.height - 70);
      const x = Phaser.Math.Between(-100, this.scene.scale.width + 100)
      const y = this.scene.scale.height - height;
      middle.fillRect(x, y, width, height);
    }

    far.fillStyle(this.colors[1], 1);

    for (let i = 0; i < Phaser.Math.Between(10, 20); i++) {
      const width = Phaser.Math.Between(50, 300);
      const height = Phaser.Math.Between(0, this.scene.scale.height);
      const x = Phaser.Math.Between(-100, this.scene.scale.width + 100)
      const y = this.scene.scale.height - height;
      far.fillRect(x, y, width, height);
    }

    this.textures = {
      near,
      middle,
      far,
    }
  }

}
