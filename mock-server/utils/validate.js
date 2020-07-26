module.exports = {
  isValidPortNumber: (port) => {
    const n = Math.floor(Number(port));
    return n !== Infinity && String(n) === port && n >= 0;
  },
};
