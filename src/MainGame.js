import { Ball } from "./Ball";
import { Note } from "./Note";

export class MainGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;

    this.lastDirection = 0;

    this.DEFAULT_BPM = 105; // Raw BPM of the music. DO NOT CHANGE
    this.BPM = 52.5;
    this.MINUTE = 60000;

    this.noteVelocity = 400;
    this.noteTimer;

    this.spawnTimeout = false;

    // Scaling Difficulty
    this.increaseDifficulty("begin");
    this.difficultyTimer = this.time.addEvent({
      delay: this.MINUTE / 3,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true
    });

    // Fire Timeout Timer
    this.noteTimer = this.time.addEvent({
      delay: 150,
      callback: function() {
        this.spawnTimeout = false;
      },
      callbackScope: this,
      loop: true
    });

    // Draw Background
    this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setScale(3);

    // Group and Collider Setup
    this.players = this.add.group();
    this.notes = this.add.group();

    this.physics.add.collider(
      this.notes,
      this.players,
      this.hitNote,
      null,
      this
    );

    // Init Keyboard
    this.keyLEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.keySPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyRIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    // Decorative Center  Ball
    this.add.image(this.centerX, this.centerY, "playerBall");

    // this.add
    //   .sprite(
    //     300,
    //     300,
    //     "UI",
    //     "yellow_button13",
    //     null,
    //     Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    //   )
    //   .setScale(2);

    // this.sound.play("music");
  }

  update() {
    this.inputHandler();

    this.players.children.each(function(ball) {
      ball.offScreen();
    }, this);

    // if (this.playerBall.offScreen()) {
    //   this.playerBall = new Ball(this, this.centerX, this.centerY);
    //   this.players.add(this.playerBall);
    // }
  }

  hitNote(note, player) {
    player.destroy();
    note.destroy();
  }
  inputHandler() {
    if (this.spawnTimeout === true) return;
    else {
      if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
        this.notes.clear(true, true);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
        this.spawnPlayer("left");
      } else if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
        this.spawnPlayer("right");
      } else if (Phaser.Input.Keyboard.JustDown(this.keyUP)) {
        this.spawnPlayer("up");
      } else if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)) {
        this.spawnPlayer("down");
      }
    }
  }

  increaseDifficulty(isStart) {
    if (!isStart === "begin") {
      this.BPM *= 1.5;
      this.noteTimer.destroy();
    }

    console.log("Difficulty Increasing");
    this.noteTimer = this.time.addEvent({
      delay: this.MINUTE / this.BPM,
      callback: this.spawnNote,
      callbackScope: this,
      loop: true
    });
  }

  spawnPlayer(direction) {
    this.tmp = this.physics.add.existing(
      new Ball(this, this.centerX, this.centerY, direction)
    );
    this.players.add(this.tmp);

    this.spawnTimeout = true;
  }

  spawnNote() {
    // Enum
    const Cardinality = { north: 0, east: 1, south: 2, west: 3 };
    Object.freeze(Cardinality);

    // Spawn note in different directions each time
    let spawnPoint;
    do {
      spawnPoint = Phaser.Math.Between(Cardinality.north, Cardinality.west);
    } while (spawnPoint === this.lastDirection);

    this.lastDirection = spawnPoint;

    switch (spawnPoint) {
      case Cardinality.north:
        this.tmp = this.physics.add
          .existing(new Note(this, this.centerX, 0))
          .setAccelerationY(this.noteVelocity);
        this.notes.add(this.tmp);
        break;

      case Cardinality.east:
        this.tmp = this.physics.add
          .existing(new Note(this, this.centerX * 2, this.centerY))
          .setAccelerationX(-this.noteVelocity);
        this.notes.add(this.tmp);
        break;

      case Cardinality.south:
        this.tmp = this.physics.add
          .existing(new Note(this, this.centerX, this.centerY * 2))
          .setAccelerationY(-this.noteVelocity);
        this.notes.add(this.tmp);
        break;

      case Cardinality.west:
        this.tmp = this.physics.add
          .existing(new Note(this, 0, this.centerY))
          .setAccelerationX(this.noteVelocity);
        this.notes.add(this.tmp);
        break;

      default:
        break;
    }
  }
}
