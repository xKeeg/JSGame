import { Projectile } from "./Projectile";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    var texture = "ball";
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.Direction = { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 };
    Object.freeze(this.Direction);

    this.setMaxVelocity(250);
    this.setOrigin(0.5, 0.5);

    this.speed = 2000;
    this.canFire = true;
  }

  move(direction) {
    let d = this.Direction;

    switch (direction) {
      case d.LEFT:
        this.setAccelerationX(-this.speed);
        this.setAccelerationY(0);
        break;
      case d.RIGHT:
        this.setAccelerationX(this.speed);
        this.setAccelerationY(0);
        break;
      case d.UP:
        this.setAccelerationY(-this.speed);
        this.setAccelerationX(0);
        break;
      case d.DOWN:
        this.setAccelerationY(this.speed);
        this.setAccelerationX(0);
        break;
    }
  }

  shoot(direction) {
    if (this.canFire === true) {
      // Stop Repeated Shots being fired
      this.canFire = false;

      this.scene.add.existing(
        new Projectile(this.scene, this.x, this.y, direction)
      );

      let firingDelay = this.scene.time.addEvent({
        delay: 1000,
        callback: this.allowFire,
        callbackScope: this,
        loop: false
      });
    }
  }

  allowFire() {
    console.log("canFire");
    this.canFire = true;
  }
}
