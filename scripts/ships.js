const Ship = ({type, length}) => ({
  type,
  
  length,
  
  positions: [],

  hits: 0,

  setShipPositions(pos, orientation) {
    switch (orientation) {
    case 'horizontal':
      this.positions.push(pos);
      for (let i = 1; i < this.length; i++) {
        this.positions.push([pos[0] + i, pos[1]]);
      }
      break;
    case 'vertical':
      this.positions.push(pos);
      for (let i = 1; i < this.length; i++) {
        this.positions.push([pos[0], pos[1] + i]);
      }
      break;
    }
  },

  hit(posX, posY) {
    for (let pos of this.positions) {
      if (pos[0] === posX && pos[1] === posY) {
        this.hits++;
        return 'Direct Hit!';
      }
    }
    return 'Miss';
  },

  isSunk() {
    if (this.hits === length) {
      return true;
    } else {
      return false;
    }
  }
});

const ships = {
  carrier: Ship({ type: "carrier", length: 5 }),
  battleship: Ship({ type: "battleship", length: 4 }),
  cruiser: Ship({ type: "crusier", length: 3 }),
  submarine: Ship({ type: "submarine", length: 3 }),
  destroyer: Ship({ type: "destroyer", length: 2 }),
};

// console.log(ships.carrier);
// ships.carrier.setShipPositions([2,3], 'vertical');
// console.log(ships.carrier.hit(2,4));
// console.log(ships.carrier.hits);
// console.log(ships.carrier.isSunk());
// console.log(ships.carrier.hit(2, 5));
// console.log(ships.carrier);
// console.log(ships.carrier.isSunk());
// console.log(ships.carrier.hits);
// console.log(ships.carrier.hit(2, 6));
// console.log(ships.carrier.hits);
// console.log(ships.carrier.isSunk());
// console.log(ships.carrier.hit(2, 7));
// console.log(ships.carrier.hits);
// console.log(ships.carrier.isSunk());
// console.log(ships.carrier.hit(2, 3));
// console.log(ships.carrier);
// console.log(ships.carrier.isSunk());

 


module.exports = { ships };