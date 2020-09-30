var resultArray = [];

$("#go").click(() => {
  $("#go").addClass("hide");
  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "buttons");
  document.body.append(mainDiv);
  window.intErval = setInterval(function () {
    var newSec = parseInt($("#timer").text());
    $("#timer").text(--newSec);
  }, 1000);

  setTimeout(() => {
    if (intErval) {
      resultArray = [];
      clearInterval(intErval);
      alert("Game Finish You Didn't Finish On time");
      $("#timer").text("10");
      $("#timerMain").addClass("hide");
      $("#go").removeClass("hide");
      $("#buttons").remove();
    }
  }, 10000);

  var setElement = new Set();
  for (let i = 0; i < 20; i++) {
    setElement.add(Math.ceil(Math.random() * 20));
    if (setElement.size == 10) {
      break;
    }
  }

  var arrayElement = [...setElement];
  var inputs = [];
  for (let i = 0; i < 10; i++) {
    var btn = document.createElement("input");
    btn.value = arrayElement[i];
    btn.setAttribute("onclick", "createSequence(this)");
    btn.setAttribute("readonly", true);
    btn.setAttribute("id", arrayElement[i]);
    inputs.push(btn);
  }

  $("#buttons").html(inputs);
  $("#timerMain").removeClass("hide");
});

function createSequence(e) {
  if (resultArray.length < 10) {
    resultArray.push(e.id);
  }
  $("#" + e.id).attr("disabled", "disabled");
  $("#" + e.id).addClass("disabled");
  if (resultArray.length == 10) {
    $.post("game", { result: resultArray }, (xData, status) => {
      if (status == "success") {
        clearInterval(intErval);
        intErval = false;
        resultArray = [];
        var time = 15 - parseInt($("#timer").text());
        alert("Game Finish \nYou Take " + time + " Seconds\n Result: " + xData);
        $("#timer").text("10");
        $("#timerMain").addClass("hide");
        $("#go").removeClass("hide");
        $("#buttons").remove();
      }
    });
  }
}
