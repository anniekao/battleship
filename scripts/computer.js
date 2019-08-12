const Computer = () => ({
  name: 'Computer',
  points: 0,
  guess() {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    return [x, y];
  }
});


module.exports = { Computer };