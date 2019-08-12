const assert = require("chai").assert;
const ships = require("../ships");
const { createBoard } = require("../main.js");

describe("createShips", () => {
  it("returns a carrier ship with a defined type", () => {
    const input = { type: "carrier", length: 5 };

    assert.equal(ships(input).type, "carrier");
  });

  it("returns a carrier ship with length 5", () => {
    const input = { type: "carrier", length: 5 };

    assert.equal(ships(input).length, 5);
  });
});


