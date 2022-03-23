import { BombedWall, Door, Maze, Room, RoomWithABomb, Wall } from "./maze";
import { Direction } from "./maze/types";

export class MazeGame {
  static createMaze() {
    const maze = new Maze();
    const room1 = new Room(1);
    const room2 = new Room(2);
    const theDoor = new Door(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    room1.setSide(Direction.North, new Wall());
    room1.setSide(Direction.East, theDoor);
    room1.setSide(Direction.South, new Wall());
    room1.setSide(Direction.West, new Wall());

    room2.setSide(Direction.North, new Wall());
    room2.setSide(Direction.East, new Wall());
    room2.setSide(Direction.South, new Wall());
    room2.setSide(Direction.West, theDoor);
    return maze;
  }
}

// To add a new BombedMazeGame (see factory.ts), we need to duplicate the entire createMaze code.
// this is really tedious...
export class BombedMazeGame {
  static createMaze() {
    const maze = new Maze();
    const room1: Room = new RoomWithABomb(1);
    const room2: Room = new RoomWithABomb(2);
    const theDoor = new Door(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    room1.setSide(Direction.North, new BombedWall());
    room1.setSide(Direction.East, theDoor);
    room1.setSide(Direction.South, new BombedWall());
    room1.setSide(Direction.West, new BombedWall());

    room2.setSide(Direction.North, new BombedWall());
    room2.setSide(Direction.East, new BombedWall());
    room2.setSide(Direction.South, new BombedWall());
    room2.setSide(Direction.West, theDoor);
    return maze;
  }
}

function main() {
  const maze = MazeGame.createMaze();
  console.log(maze);
  const bombedMaze = BombedMazeGame.createMaze();
  console.log(bombedMaze);
}
main();
