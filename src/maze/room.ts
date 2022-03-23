import { MapSite } from ".";
import { Door } from "./door";
import { Direction } from "./types";
import { Wall } from "./wall";

export class Room extends MapSite {
  roomNumber: number;
  sides: MapSite[];
  constructor(roomNumber: number) {
    super();
    this.roomNumber = roomNumber;
    this.sides = new Array<MapSite>(4);
  }
  public enter(): void {}
  public getSide(direction: Direction): MapSite {
    return this.sides[direction];
  }
  public setSide(direction: Direction, mapSite: Wall | Door): void {
    this.sides[direction] = mapSite;
  }
}

export class RoomWithABomb extends Room {
  private timeCreated: number;
  constructor(roomNumber: number) {
    super(roomNumber);
    this.timeCreated = Date.now();
  }
  public enter(): void {
    if (Date.now() - this.timeCreated > 30 * 1000) {
      // 30 seconds elapsed
      throw new Error("30 seconds elapsed. The bomb explodes, and you die.");
    }
  }
}
