import { BombedWall, Door, Maze, Room, RoomWithABomb, Wall } from "./maze";
import { Direction } from "./maze/types";

class MazeGame {
  // TODO: should all of these methods be static?
  // factory methods
  makeMaze(): Maze {
    return new Maze();
  }
  makeRoom(n: number): Room {
    return new Room(n);
  }
  makeWall(): Wall {
    return new Wall();
  }
  makeDoor(room1: Room, room2: Room): Door {
    return new Door(room1, room2);
  }

  // Creator
  createMaze(): Maze {
    // ONLY THESE FACTORY METHODS ARE DIFFERENT FROM basic createMaze()
    const maze = this.makeMaze();
    const room1 = this.makeRoom(1);
    const room2 = this.makeRoom(2);
    const theDoor = this.makeDoor(room1, room2);

    // ALL THE REST IS THE SAME
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

// very compact (compare to basic.ts)
class BombedMazeGame extends MazeGame {
  makeWall(): Wall {
    return new BombedWall();
  }
  makeRoom(n: number): Room {
    return new RoomWithABomb(n);
  }
}

function main() {
  const mazeGame = new MazeGame();
  const maze1 = mazeGame.createMaze();
  console.log(maze1);
  const bombedMazeGame = new BombedMazeGame();
  const maze2 = bombedMazeGame.createMaze();
  console.log(maze2)
}
main();
