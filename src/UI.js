/*
    This class overlays a UI scene over the current main game scene. 
*/

export class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    this.mainGame = this.scene.get("playGame"); // Get a reference to the main game scene

    this.add
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

    this.UIText = this.add.text(
      50,
      45,
      "SCORE: " + this.mainGame.score.toString(),
      {
        fontFamily: '"Impact"',
        color: "#AB9743",
        fontSize: "4em"
      }
    );
  }

  update() {
    this.UIText.setText("SCORE: " + this.mainGame.score.toString());
  }
}
