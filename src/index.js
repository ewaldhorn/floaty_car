import { Engine } from "https://floaty.dev/engine-v1.js";
import { Track } from "./track";

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
  track.update();
}

// ----------------------------------------------------------------------------
//                                                                 RENDER STATE
function draw() {
  if (isPaused) {
    // show Pause message
  } else {
    cls();
    track.draw();
  }

  // Toggle pause on or off
  if (btnp("p")) {
    isPaused = !isPaused;
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
