import { BombedWall, Door, Maze, Room, RoomWithABomb, Wall } from "./maze";
import { Direction } from "./maze/types";

class MazeFactory {
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
}

class BombedMazeFactory extends MazeFactory {
  makeWall(): Wall {
    return new BombedWall();
  }
  makeRoom(n: number): Room {
    return new RoomWithABomb(n);
  }
}

class MazeGame {
  // Creator
  createMaze(mazeFactory: MazeFactory): Maze {
    // ONLY THESE FACTORY METHODS ARE DIFFERENT FROM Factory's classes
    const maze = mazeFactory.makeMaze();
    const room1 = mazeFactory.makeRoom(1);
    const room2 = mazeFactory.makeRoom(2);
    const theDoor = mazeFactory.makeDoor(room1, room2);

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

function main() {
  const mazeGame = new MazeGame();

  const mazeFactory = new MazeFactory();
  const maze1 = mazeGame.createMaze(mazeFactory);
  console.log(maze1);
  const bombedMazeFactory = new BombedMazeFactory();
  const maze2 = mazeGame.createMaze(bombedMazeFactory);
  console.log(maze2);
}
main();
