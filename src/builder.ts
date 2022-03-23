import { Door, Maze, Room, Wall } from "./maze";
import { Direction } from "./maze/types";

abstract class MazeBuilder {
  protected _currentMaze: Maze = new Maze();
  constructor() {
    this.resetMaze();
  }
  abstract resetMaze(): void;
  abstract buildRoom(n: number): void;
  abstract buildDoor(roomFrom: number, roomTo: number): void;
  getMaze(): Maze {
    return this._currentMaze;
  }
}

class StandardMazeBuilder extends MazeBuilder {
  resetMaze(): void {
    this._currentMaze = new Maze();
  }
  private commonWall(r1: Room, r2: Room): Direction {
    // FIXME: fake implementation.
    //        this should return the direction of r2 wrt r1.
    return Direction.East;
  }
  buildDoor(n1: number, n2: number): void {
    const room1 = this._currentMaze.roomNo(n1);
    const room2 = this._currentMaze.roomNo(n2);
    const door = new Door(room1, room2);

    room1.setSide(this.commonWall(room1, room2), door);
    room2.setSide(this.commonWall(room2, room1), door);
  }
  buildRoom(n: number): void {
    if (this._currentMaze.roomNo(n)) {
      throw new Error(`Maze already contains a room ${n}`);
    }
    const room = new Room(n);
    this._currentMaze.addRoom(room);
    room.setSide(Direction.North, new Wall());
    room.setSide(Direction.East, new Wall());
    room.setSide(Direction.South, new Wall());
    room.setSide(Direction.West, new Wall());
  }
}

// can't create this using factorymethod/abstractfactory
// since makeRoom() needs to return a room,
// whereas buildRoom() here doesn't return anything
// (created product is entirely encapsulated within builder!!)
class CountingMazeBuilder extends MazeBuilder {
  private _rooms = 0;
  private _doors = 0;

  buildDoor(roomFrom: number, roomTo: number): void {
    this._doors++;
  }
  buildRoom(n: number): void {
    this._rooms++;
  }
  resetMaze(): void {
    this._rooms = 0;
    this._doors = 0;
  }
  getCounts() {
    return {
      rooms: this._rooms,
      doors: this._doors,
    };
  }
}

class MazeGame {
  createMaze(builder: MazeBuilder) {
    builder.resetMaze();

    builder.buildRoom(1);
    builder.buildRoom(2);

    builder.buildDoor(1, 2);

    return builder.getMaze();
  }
  createComplexMaze(builder: MazeBuilder) {
    builder.resetMaze();

    builder.buildRoom(1);
    builder.buildRoom(2);
    builder.buildRoom(3);
    builder.buildRoom(4);
    builder.buildRoom(5);

    builder.buildDoor(1, 2);
    builder.buildDoor(1, 3);
    builder.buildDoor(3, 4);
    builder.buildDoor(2, 5);

    return builder.getMaze();
  }
}

function main() {
  const mazeGame = new MazeGame();
  const builder = new StandardMazeBuilder();
  const maze = mazeGame.createMaze(builder);

  console.log(maze);

  const countingBuilder = new CountingMazeBuilder();
  mazeGame.createMaze(countingBuilder);
  console.log("Simple maze contains:", countingBuilder.getCounts());
  mazeGame.createComplexMaze(countingBuilder);
  console.log("Complex maze contains:", countingBuilder.getCounts());
}
main();
