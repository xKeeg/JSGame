import Ball from "img/ball.png";

export class Title extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {
    this.load.image("ball", Ball);
  }

  create() {
    this.scene.start("playGame");
  }
}
