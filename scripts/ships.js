const Ship = ({type, length}) => ({
  type,
  
  length,
  
  positions: [],

  hits: 0,

  setShipPosition(pos, orientation) {
    const positions = [];

    switch (orientation) {
    case 'horizontal':
      for (let i = 1; i < this.length; i++) {
        let x = pos[0] + i;
        if (x > 9 || x < 0) {
          return false;
        } else {
          positions.push([x , pos[1]]);
        }
      }
      this.positions = [pos,...positions];
      break;
    case 'vertical':
      for (let i = 1; i < this.length; i++) {
        let y = pos[1] + i;
        if (y <= 9 && y >= 0) {
          positions.push([pos[0], pos[1] + i]);
        } else {
          return "Does not compute";
        }
      }
      this.positions = [pos, ...positions];
      break;
    }
  },

  hit() {
    this.hits++;
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
// ships.carrier.setShipPosition([2,3], 'vertical');
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