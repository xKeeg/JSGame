import background from "img/starfield.png";
import PBall from "img/ball.png";
import UI_Sprites from "img/UI.png";
import UI_JSON from "img/UI.json";

export class Title extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {
    this.load.image("background", background);
    this.load.image("playerBall", PBall);
    this.load.audio("music", "src/img/music.mp3");
    this.load.atlas("UI", UI_Sprites, UI_JSON);
  }

  create() {
    this.scene.start("playGame");
  }
}
