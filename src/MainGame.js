import { Player } from "./Player";

export class MainGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;

    this.playerVelocity = 100;

    this.Player = this.physics.add.existing(
      new Player(this, this.centerX, this.centerY)
    );
    this.Player.body.collideWorldBounds = true;

    // Setup Keypress callback
    this.input.keyboard.on("keydown", this.inputHandler, this);
  }

  update() {}

  inputHandler(event) {
    const Direction = { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 };

    var keyPressed = event.code;
    switch (event.code) {
      // Movement
      case "KeyW":
        this.Player.move(Direction.UP);
        break;
      case "KeyS":
        this.Player.move(Direction.DOWN);
        break;
      case "KeyA":
        this.Player.move(Direction.LEFT);
        break;
      case "KeyD":
        this.Player.move(Direction.RIGHT);
        break;

      // Projectile
      case "ArrowUp":
        this.Player.shoot(Direction.UP);
        break;
      case "ArrowDown":
        this.Player.shoot(Direction.DOWN);
        break;
      case "ArrowLeft":
        this.Player.shoot(Direction.LEFT);
        break;
      case "ArrowRight":
        this.Player.shoot(Direction.RIGHT);
        break;
      default:
        return;
    }
  }
}
