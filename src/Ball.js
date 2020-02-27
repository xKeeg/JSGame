export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    var texture = "playerBall";
    super(scene, x, y, texture);

    this.speed = 1500;
    this.direction = direction;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.move(this.direction);
  }

  move(direction) {
    if (this.direction === "left") {
      this.setVelocityX(-this.speed);
    } else if (this.direction === "right") {
      this.setVelocityX(this.speed);
    } else if (this.direction === "up") {
      this.setVelocityY(-this.speed);
    } else if (this.direction === "down") {
      this.setVelocityY(this.speed);
    }
  }

  offScreen() {
    if (this.x > 1200 || this.x < 0 || this.y > 1200 || this.y < 0) {
      this.destroy();
      console.log("dead");
    }
  }
}
