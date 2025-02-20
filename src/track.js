import { isRandomTrue, randomBetween } from "./utils";

// ----------------------------------------------------------------------------
const block_size = 8;
const block_count = 128 / block_size;

// ----------------------------------------------------------------------------
//                                                                        TRACK
export class Track {
  rows = 128 / block_size;
  updateCycle = 0;
  roadWidth = 6;
  roadPos = 5;

  // --------------------------------------------------------------------------
  init() {
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
  // create a new array of rows, add one to the top and then copy the rest over,
  // moving them down by one
  update() {
    this.updateCycle += 1;

    if (this.updateCycle >= 25) {
      this.updateCycle = 0;
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

      if (isRandomTrue()) {
        if (isRandomTrue()) {
          if (this.roadWidth < 6) {
            this.roadWidth += 1;
          } else if (this.roadWidth > 3) {
            this.roadWidth -= 1;
          }
        }
      }

      if (isRandomTrue()) {
        if (this.roadPos > 2) {
          if (isRandomTrue()) {
            this.roadPos -= 1;
          }
        } else if (this.roadPos < block_count - this.roadWidth) {
          this.roadPos += 1;
        }
      } else {
        if (this.roadPos < block_count - this.roadWidth) {
          this.roadPos += 1;
        }
      }

      tmp[0].blocks.fill(0, this.roadPos, this.roadPos + this.roadWidth);

      for (let i = 0; i < this.rows - 1; i++) {
        tmp.push(this.roadSections[i]);
      }

      this.roadSections = tmp;
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
            break;
          case 3:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            pset(xpos + 7, ypos + 2, 14);
            break;
          case 4:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            pset(xpos + 7, ypos + 7, 11);
            break;
          case 5:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 3);
            break;
          default:
            rectFill(xpos, ypos, xpos + block_size, ypos + block_size, 1);
        }
      }
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
