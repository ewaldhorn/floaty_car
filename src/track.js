import { randomBetween } from "./utils";

// ----------------------------------------------------------------------------
const block_size = 8;
const block_count = 128 / block_size;

// ----------------------------------------------------------------------------
//                                                                        TRACK
export class Track {
  rows = 128 / block_size;

  // --------------------------------------------------------------------------
  init() {
    this.points = Array(this.rows)
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

    // for debugging, add a road to the top
    this.points[0].blocks = [1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 3, 1, 1, 5];
  }

  // --------------------------------------------------------------------------
  // create a new array of rows, add one to the top and then copy the rest over,
  // moving them down by one
  update() {}

  // --------------------------------------------------------------------------
  draw() {
    for (let y = 0; y < block_count; y++) {
      for (let x = 0; x < block_count; x++) {
        let xpos = x * block_size;
        let ypos = y * block_size;

        console.log(this.points[y]);

        switch (this.points[y].blocks[x]) {
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
