module.exports = class Game {
  sequence(resultArray) {
    var score = "Win";
    for (var i = 0; i < resultArray.length - 1; i++) {
      if (parseInt(resultArray[i]) > parseInt(resultArray[i + 1])) {
        score = "Loose";
        break;
      }
    }
    if (score == "Win") {
      return "Win";
    } else if (score == "Loose") {
      return "Loose";
    } else {
      return "Draw";
    }
  }
};
