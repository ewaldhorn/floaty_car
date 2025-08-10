import { isRandomTrue, randomBetween } from "./utils";

// ----------------------------------------------------------------------------
const block_size = 8;
export const block_count = 128 / block_size;
export const speed_factor = 45;
let update_cycle_target = 25;

// ----------------------------------------------------------------------------
//                                                                        TRACK
export class Track {
  rows = 128 / block_size;
  updateCycle = 0;
  roadWidth = 6;
  roadPos = 5;
  playerPos = Math.floor(block_count / 2);
  score = 0;
  hasCrashed = false;

  // --------------------------------------------------------------------------
  init() {
    this.newGame();
  }

  // --------------------------------------------------------------------------
  newGame() {
    this.updateCycle = 0;
    this.roadWidth = 6;
    this.roadPos = 5;
    this.playerPos = Math.floor(block_count / 2);
    this.score = 0;
    this.hasCrashed = false;

    this.roadSections = Array(this.rows)
      .fill()
      .map(() => {
        return new RoadSection(
          Array(this.rows)
            .fill(0)
            .map(() => {
              return randomBetween(1, 5);
            }),
        );
      });

    // now draw the initial road sections
    for (let i = 0; i < this.rows; i++) {
      this.roadSections[i].blocks.fill(
        0,
        this.roadPos,
        this.roadPos + this.roadWidth,
      );
    }
  }

  // --------------------------------------------------------------------------
  checkCrash() {
    if (this.roadSections[this.rows - 1].blocks[this.playerPos] != 0) {
      this.hasCrashed = true;
    }
  }

  // --------------------------------------------------------------------------
  manageGameSpeed() {
    update_cycle_target = Math.max(
      2,
      Math.ceil(20 - this.score / speed_factor),
    );
  }

  // --------------------------------------------------------------------------
  adjustRoadSizeAndPosition() {
    if (isRandomTrue()) {
      if (this.roadWidth < 6) {
        this.roadWidth += 1;
      } else if (this.roadWidth > 3) {
        this.roadWidth -= 1;
      }
    }

    if (isRandomTrue()) {
      if (isRandomTrue() && this.roadPos > 2) {
        this.roadPos -= 1;
      } else if (this.roadPos < block_count - this.roadWidth) {
        this.roadPos += 1;
      }
    }
  }

  // --------------------------------------------------------------------------
  // create a new array of rows, add one to the top and then copy the rest over,
  // moving them down by one
  update() {
    this.updateCycle += 1;

    if (this.updateCycle >= update_cycle_target) {
      this.updateCycle = 0;

      this.manageGameSpeed();
      this.checkCrash();

      if (!this.hasCrashed) {
        this.score += 1;
        let tmp = [];

        tmp.push(
          new RoadSection(
            Array(this.rows)
              .fill(0)
              .map(() => {
                return randomBetween(1, 5);
              }),
          ),
        );

        this.adjustRoadSizeAndPosition();

        tmp[0].blocks.fill(0, this.roadPos, this.roadPos + this.roadWidth);

        for (let i = 0; i < this.rows - 1; i++) {
          tmp.push(this.roadSections[i]);
        }

        this.roadSections = tmp;
      }

      this.checkCrash();
    }
  }

  // --------------------------------------------------------------------------
  draw() {
    for (let y = 0; y < block_count; y++) {
      for (let x = 0; x < block_count; x++) {
        let xpos = x * block_size;
        let ypos = y * block_size;

        switch (this.roadSections[y].blocks[x]) {
          case 0:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 0);
            break;
          case 1:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            break;
          case 2:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            pset(xpos + 5, ypos + 5, 11);
            pset(xpos + 4, ypos + 4, 11);
            pset(xpos + 6, ypos + 4, 11);
            break;
          case 3:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            pset(xpos + 5, ypos + 2, 14);
            break;
          case 4:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            pset(xpos + 5, ypos + 6, 11);
            break;
          case 5:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            break;
          default:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 1);
        }
      }
    }

    // draw player
    let xpos = this.playerPos * block_size;
    let ypos = (this.rows - 1) * block_size;
    if (this.hasCrashed) {
      rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 8);
    } else {
      rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 7);
    }

    // render score
    text(`Score: ${this.score}`, 1, 1, 15);

    if (this.hasCrashed) {
      rectFill(30, 55, 100, 76, 7);
      text("CRASHED!", 46, 55, 8);
      text("(R)estart?", 46, 65, 8);
    }
  }
}

// ----------------------------------------------------------------------------
//                                                                 ROAD SECTION
class RoadSection {
  constructor(sections) {
    this.blocks = sections;
  }
}
