import { Ball } from "./Ball";
import { Note } from "./Note";

export class MainGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;

    this.touchX;
    this.touchY;

    this.lastDirection = 0;

    this.DEFAULT_BPM = 105; // Raw BPM of the music. DO NOT CHANGE
    this.BPM = 52.5;
    this.MINUTE = 60000;

    this.noteVelocity = 400;
    this.noteTimer;

    this.spawnTimeout = false;
    this.score = 0;

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

    this.physics.add.overlap(
      this.notes,
      this.players,
      this.hitNote,
      null,
      this
    );

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
    this.add.image(this.centerX, this.centerY, "cannon").setScale(0.5);

    this.UI = this.scene.launch("UI");
    this.sound.play("music");
  }

  update() {
    this.inputHandler();

    // Delete any offscreen balls
    this.players.children.each(function(ball) {
      ball.offScreen();
    }, this);
  }

  hitNote(note, player) {
    this.score++;

    if (player.collides === true) {
      player.destroy();
    }

    note.destroy();
  }
  inputHandler() {
    if (this.spawnTimeout === true) return;
    else {
      if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
        this.spawnPlayer("up", false);
        this.spawnPlayer("down", false);
        this.spawnPlayer("left", false);
        this.spawnPlayer("right", false);
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

  spawnPlayer(direction, collide = true) {
    this.tmp = this.physics.add.existing(
      new Ball(this, this.centerX, this.centerY, direction, collide)
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
