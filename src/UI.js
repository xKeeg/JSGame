import { Game } from "phaser";

/*
    This class overlays a UI scene over the current main game scene. 
*/

export class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    this.gameLoop = this.scene.get("playGame"); // Get a reference to the main game scene

    ////////////////////////////// Scoring
    this.boxScore = this.add
      .image(
        20,
        20,
        "UI",
        "yellow_button13",
        null,
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
      )
      .setScale(2)
      .setOrigin(0);
    this.lblScore = this.add.text(
      50,
      45,
      "SCORE: " + this.gameLoop.score.toString(),
      {
        fontFamily: '"Impact"',
        color: "#AB9743",
        fontSize: "4em"
      }
    );

    ////////////////////////////// Upgrades

    // Upgrade 1
    this.boxUpgrade1 = this.add
      .image(
        1200 - this.boxScore.displayWidth - 20,
        20,
        "UI",
        "yellow_button13",
        null,
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
      )
      .setScale(2)
      .setOrigin(0)
      .setInteractive();

    this.lblUpgrade1 = this.add.text(
      this.boxUpgrade1.x + 30,
      45,
      "Purchase Shield",
      {
        fontFamily: '"Impact"',
        color: "#AB9743",
        fontSize: "4em"
      }
    );

    this.boxUpgrade1.on(
      "pointerdown",
      function() {
        this.gameLoop.increaseScore(100);
      },
      this
    );

    // Upgrade 2
  }

  update() {
    this.lblScore.setText("SCORE: " + this.gameLoop.score.toString());
  }
}
