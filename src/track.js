import { randomBetween } from "./utils";

// ----------------------------------------------------------------------------
const block_size = 128 / 8;

export class Track {
  rows = 128 / 8;

  // --------------------------------------------------------------------------
  init() {
    this.points = Array(this.rows)
      .fill()
      .map(() => {
        return new RoadSection(
          Array(this.rows)
            .fill(0)
            .map(() => {
              return randomBetween(0, 5);
            }),
        );
      });
  }

  // --------------------------------------------------------------------------
  update() {}

  // --------------------------------------------------------------------------
  draw() {
    for (let y = 0; y < block_size; y++) {
      for (let x = 0; x < block_size; x++) {
        let xpos = x * 8;
        let ypos = y * 8;

        console.log(this.points[y]);

        switch (this.points[y].blocks[x]) {
          case 0:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            break;
          case 1:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            break;
          case 2:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            break;
          case 3:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            pset(xpos + 7, ypos + 2, 14);
            break;
          case 4:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            pset(xpos + 7, ypos + 7, 11);
            break;
          case 5:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 3);
            break;
          case 6:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 0);
            break;
          default:
            rectFill(xpos, ypos, xpos + 8, ypos + 8, 1);
        }
      }
    }
  }
}

// ----------------------------------------------------------------------------
class RoadSection {
  constructor(sections) {
    this.blocks = sections;
  }
}
