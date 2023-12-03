import { AnimatedSprite, Container, Sprite, Texture, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";

interface DirectionalObject {
  south: Texture[];
  southEast: Texture[];
  east: Texture[];
  northEast: Texture[];
  north: Texture[];
  northWest: Texture[];
  west: Texture[];
  southWest: Texture[];
}

//extend from Animated Class perhaps!??!?!?
export class Player extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;
  private player: AnimatedSprite;
  private walkVelocity = 0.1;
  private walkDirections: DirectionalObject = {
    south: [],
    southEast: [],
    east: [],
    northEast: [],
    north: [],
    northWest: [],
    west: [],
    southWest: [],
  };
  private isPlayerAdded = false;
  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.player = this.createPlayer();
    Keyboard.initialize();

    // See the `, this` thingy there? That is another way of binding the context!
    Ticker.shared.add(this.update, this);

    //run on keyup

    Object.entries(this.walkDirections).forEach(
      ([direction, sprites], dirIndex) => {
        console.log("logging yoo");
        const dir = direction as keyof DirectionalObject;
        const spr = sprites as DirectionalObject[typeof dir];
        for (let i = 0; i < 4; i++) {
          spr?.push(
            Texture.from(
              `char/tile0${String(dirIndex * 4 + i).padStart(2, "0")}.png`
            )
          );
        }
      }
    );

    Object.entries(this.walkDirections).forEach(
      ([direction, sprites], dirIndex) => {}
    );
  }

  private createPlayer(): AnimatedSprite {
    const player = new AnimatedSprite([Texture.from("char/tile000.png")]);
    player.anchor.set(0.5);
    player.animationSpeed = this.walkVelocity;
    player.x = 200;
    player.y = 200;
    player.loop = false;
    setTimeout(() => {
      this.addChild(player);
      player.play();
    }, 2000);

    return player;
  }
  private update(deltaTime: number): void {
    //
    if (Keyboard.state.get("ArrowUp")) {
      if (!this.player.playing) {
        this.player.textures = this.walkDirections.north;
        this.player.play();
      }
      this.player.y -= 1;
    }

    if (Keyboard.state.get("ArrowDown")) {
      if (!this.player.playing) {
        this.player.textures = this.walkDirections.south;
        this.player.play();
      }
      this.player.y += 1;
    }

    if (Keyboard.state.get("ArrowLeft")) {
      if (!this.player.playing) {
        this.player.textures = this.walkDirections.west;
        this.player.play();
      }
      this.player.x -= 1;
    }

    if (Keyboard.state.get("ArrowRight")) {
      if (!this.player.playing) {
        this.player.textures = this.walkDirections.east;
        this.player.play();
      }
      this.player.x += 1;
    }
    //check if keyboard is empty
    if (Keyboard.state.size === 0) {
      this.player.textures = this.player.textures.slice(0, 1);
    }
  }
}
