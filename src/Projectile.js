export class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction = 0) {
    var texture = "ball";
    super(scene, x, y, texture);

    this.speed = 900;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.move(direction);
  }

  move(direction) {
    let Direction = { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 };

    switch (direction) {
      case Direction.UP:
        this.setVelocityY(-this.speed);
        break;
      case Direction.DOWN:
        this.setVelocityY(this.speed);
        break;
      case Direction.LEFT:
        this.setVelocityX(-this.speed);
        break;
      case Direction.RIGHT:
        this.setVelocityX(this.speed);
        break;
      default:
        break;
    }
  }

  offScreen() {
    if (this.x > 1200 || this.x < 0 || this.y > 1200 || this.y < 0) {
      this.destroy();
      console.log("dead");
    }
  }
}
