import { Application } from "pixi.js";
import { Player } from "./scenes/Scene"; // This is the import statement

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  width: 640,
  height: 480,
});

// pass in the screen size to avoid "asking up"
const player1 = new Player(app.screen.width, app.screen.height);

app.stage.addChild(player1);
