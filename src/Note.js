export class Note extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    var texture = "playerBall";
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.canMove = true;
  }

  offScreen() {
    if (
      this.x > innerWidth ||
      this.x < 0 ||
      this.y > innerHeight ||
      this.y < 0
    ) {
      this.destroy();
    }
  }
}
