const { Computer } = require("./computer");
const { ships } = require('./ships');

class ComputerBoard {
  constructor(comp, ships) {
    this.computer = comp;
    this.ships = ships;
    this.board = [...Array(10)].map(e => Array(10).fill("O"));
  }

  setRandomShipPositions() {
    for (let ship in this.ships) {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 9);
      let randNum = Math.floor(Math.random() * 2);
      let orientation = randNum === 1 ? 'vertical' : 'horizontal';

      while (this.checkPositionOnBoard([x, y], ships[ship].length, orientation) === false) {
        x = Math.floor(Math.random() * 9);
        y = Math.floor(Math.random() * 9);
        randNum = Math.floor(Math.random() * 2);
        orientation = randNum === 1 ? "vertical" : "horizontal";
      }
      ships[ship].setShipPosition([x, y], orientation);
      this.markShipPositionOnBoard(ships[ship]);
    }
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



// Computer board // Tests

const computer = Computer();

const newCompBoard = new ComputerBoard(computer, ships);
// console.log(newCompBoard.ships.carrier.setShipPostion([2 ,3], 'horizontal'));
// console.log(newCompBoard.ships.carrier.setShipPosition([2,4], 'vertical'));
// console.log(newCompBoard.ships.carrier);
newCompBoard.setRandomShipPositions();
for (let ship in newCompBoard.ships) {
  console.log('ship: ', ship);
  console.log(newCompBoard.ships[ship].positions);
}
console.log(newCompBoard.board);

// let compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));
// compGuess = newCompBoard.computer.guess();
// console.log(newCompBoard.receiveAttack(compGuess));

// console.log(newCompBoard.board);
// console.log(newCompBoard.receiveAttack([4,5]));
// console.log(newCompBoard.ships.destroyer.hits);
// console.log(newCompBoard.receiveAttack([4,6]));
// console.log(newCompBoard.ships.destroyer.hits);
// console.log(newCompBoard.board);
// console.log(newCompBoard.receiveAttack([4,6]));

// const sunkShip = newCompBoard.checkIfShipSunk();
// if (sunkShip) {
//   console.log(`${sunkShip} has been sunk!`);
// }

