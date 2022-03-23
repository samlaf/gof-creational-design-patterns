import { MapSite, Room } from ".";

export class Door extends MapSite {
  room1: Room;
  room2: Room;
  private _isOpen: boolean;
  constructor(room1: Room, room2: Room) {
    super();
    this.room1 = room1;
    this.room2 = room2;
    this._isOpen = false;
  }
  public enter(): void {}
  public isOpen(): boolean {
    return this._isOpen;
  }
}
