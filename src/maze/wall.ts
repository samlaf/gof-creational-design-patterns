import { MapSite } from ".";

export class Wall extends MapSite {
  public enter(): void {
    throw new Error("Cannot enter a wall!");
  }
}

export class BombedWall extends Wall {
  public enter(): void {
    throw new Error("You explode!");
  }
}
