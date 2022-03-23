import { Room } from ".";

export class Maze {
  private rooms: { [roomNo: number]: Room };
  private numRooms: number;
  constructor() {
    this.rooms = {};
    this.numRooms = 0;
  }
  addRoom(room: Room) {
    this.numRooms++;
    this.rooms[this.numRooms] = room;
  }
  roomNo(n: number) {
    if (n === 0) {
      throw new Error(`Maze:roomNo: no room ${n}. Start counting from 1.`);
    }
    if (n > this.numRooms + 1) {
      throw new Error(
        `Maze:roomNo: ${n} > ${this.numRooms} (num rooms in Maze)`
      );
    }
    return this.rooms[n];
  }
}
