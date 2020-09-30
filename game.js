module.exports = class Game {
  sequence(resultArray) {
    for (var i = 0; i < resultArray.length - 1; i++) {
      if (parseInt(resultArray[i]) > parseInt(resultArray[i + 1])) {
        return "Loose";
      }
    }
    return "Win";
  }
};
