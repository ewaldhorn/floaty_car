import { Engine } from "https://floaty.dev/engine-v1.js";
import { block_count, Track } from "./track";

// ----------------------------------------------------------------------------
//                                                            START YOUR ENGINE
let engine = new Engine();
engine.expose();

// ----------------------------------------------------------------------------
//                                                           SPRITES AND SOUNDS
let sprites = {};
let sounds = {};
/*
  This little Floaty gamelet doesn't use sounds or sprites, so empty objects
  are fine.
*/

// ----------------------------------------------------------------------------
//                                                                      GLOBALS
let track = new Track();
let isPaused = false;

// ----------------------------------------------------------------------------
// //                                                          GET THINGS READY
async function init() {
  track.init();
  await this.load();
}

// ----------------------------------------------------------------------------
//                                                                 UPDATE STATE
function update() {
  if (!isPaused) {
    track.update();

    if (!track.hasCrashed) {
      if (btnp("a") || btnp("ArrowLeft")) {
        if (track.playerPos > 0) {
          track.playerPos -= 1;
          track.checkCrash();
        }
      }

      if (btnp("d") || btnp("ArrowRight")) {
        if (track.playerPos < block_count - 1) {
          track.playerPos += 1;
          track.checkCrash();
        }
      }
    }
  }
}

// ----------------------------------------------------------------------------
//                                                                 RENDER STATE
function draw() {
  if (isPaused) {
    // show Pause message
    rectFill(30, 55, 100, 65, 1);
    text("PAUSED", 50, 55, 9);
  } else {
    cls();
    track.draw();
  }

  // Toggle pause on or off
  if (btnp("p")) {
    isPaused = !isPaused;
  }

  if (isPaused) {
    if (btnp("a") || btnp("d") || btnp("ArrowLeft") || btnp("ArrowRight")) {
      isPaused = false;
    }
  }

  if (track.hasCrashed) {
    if (btnp("r")) {
      isPaused = false;
      track.newGame();
    }
  }
}

// ----------------------------------------------------------------------------
//                                                                  ENTRY POINT
engine.start({
  sprites,
  sounds,
  init,
  update,
  draw,
  target: document.querySelector(".thecar"),
});
