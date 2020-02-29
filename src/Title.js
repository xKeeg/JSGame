// import background from "img/starfield.png";

export class Title extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {}

  create() {
    this.scene.start("playGame");
  }
}
