import "phaser";
import { Title } from "./Title";
import { MainGame } from "./MainGame";
import { UI } from "./UI";

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.FIT,
    width: 1200,
    height: 1200
  },
  backgroundColor: 0x000000,
  scene: [Title, MainGame, UI],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config);
