const { ships } = require("./ships");
const player = require('./player');

// DRY: need to create general board class and have PlayerBoard and ComputerBoard inherit / override properties and methods

class PlayerBoard {
  constructor(name, ships) {
    this.player = name;
    this.ships = ships;
    this.board = [...Array(10)].map(e => Array(6).fill("O"));
  }

  setShipPositions() {
    // use readline?

    // for (let ship in this.ships) {
    //   let x = Math.floor(Math.random() * 9);
    //   let y = Math.floor(Math.random() * 9);
    //   let randNum = Math.floor(Math.random() * 2);
    //   let orientation = randNum === 1 ? 'vertical' : 'horizontal';

    //   while (this.checkPositionOnBoard([x, y], ships[ship].length, orientation) === false) {
    //     x = Math.floor(Math.random() * 9);
    //     y = Math.floor(Math.random() * 9);
    //     randNum = Math.floor(Math.random() * 2);
    //     orientation = randNum === 1 ? "vertical" : "horizontal";
    //   }
    //   ships[ship].setShipPosition([x, y], orientation);
    //   this.markShipPositionOnBoard(ships[ship]);
    // }
  }

  checkPositionOnBoard(pos, len, orientation) {
    const x = pos[0];
    const y = pos[1];
    switch (orientation) {
    case 'horizontal':
      if (x + len > 9) { return false; }
      for (let i = x; i < x + len; i++) {
        if (this.board[i][y] !== 'O') {
          return false;
        }
      }
      break;
    case 'vertical':
      if (y + len > 9) { return false; }
      for (let i = y; i < y + len; i++) {
        if (this.board[x][i] !== 'O') {
          return false;
        }
      }
      break;
    }
    return true;
  }

  markShipPositionOnBoard(ship) {
    for (let pos of ship.positions) {
      let x = pos[0];
      let y = pos[1];
      if (this.board[x][y] === "O") {
        // mark position with the ship's first two letters as ids
        this.board[x][y] = ship.type[0] + ship.type[1];
      } else {
        return false;
      }
    }
  }

  receiveAttack(pos) {
    const x = pos[0];
    const y = pos[1];
    const boardCell = this.board[x][y];

    switch (boardCell) {
    case 'ba':
      this.ships.battleship.hit();
      this.board[x][y] = "h";
      return 'Direct Hit!';
    case 'ca':
      this.ships.carrier.hit();
      this.board[x][y] = "h";
      return "Direct Hit!";
    case 'cr':
      this.ships.cruiser.hit();
      this.board[x][y] = "h";
      return "Direct Hit!";
    case 'de':
      this.ships.destroyer.hit();
      this.board[x][y] = "h";
      return "Direct Hit!";
    case 'su':
      this.ships.submarine.hit();
      this.board[x][y] = "h";
      return "Direct Hit!";
    case 'h':
    case '*':
      return 'Already Hit!';
    case 'O':
      this.board[x][y] = "*";
      return 'Miss!';
    }
  }
  // Use custom event emitter instead?
  checkIfShipSunk() {
    for (let ship in ships) {
      if (ships[ship].isSunk() === true) {
        return ship;
      }
    }
  }

  allShipsSunk() {
    for (let ship in ships) {
      if (ships[ship].isSunk() === false) {
        return false;
      }
    }
    return true;
  }
}



// Human board
const newBoard = new Board('Joe', ships);
console.log(newBoard.player);



// newCompBoard.ships.carrier.setShipPosition(newCompBoard.computer.guess(), 'vertical');
// console.log(newCompBoard.ships.carrier);

// newCompBoard.ships.battleship.setShipPosition(newCompBoard.computer.guess(), 'horizontal');
// console.log(newCompBoard.ships.battleship);

// newCompBoard.ships.cruiser.setShipPosition(newCompBoard.computer.guess(), "vertical");
// console.log(newCompBoard.ships.cruiser);

// newCompBoard.ships.submarine.setShipPosition(newCompBoard.computer.guess(), "horizontal");
// console.log(newCompBoard.ships.submarine);

// newCompBoard.ships.destroyer.setShipPosition(newCompBoard.computer.guess(), "vertical");
// console.log(newCompBoard.ships.destroyer);



// console.log('carrier', newBoard.ships.carrier.positions);
// newBoard.setShipPositions('carrier', [2,3], 'horizontal');
// console.log('carrier', newBoard.ships.carrier.positions);
// console.log('------------');
// console.log('destroyer', newBoard.ships.destroyer.positions);
// newBoard.setShipPositions('destroyer', [0, 0], 'vertical');
// console.log("destroyer", newBoard.ships.destroyer.positions);

// console.log(newBoard.allShipsSunk());
// newBoard.markShipPositions(); 

module.exports = PlayerBoard;
