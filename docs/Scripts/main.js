let resultArray = [];
$("#go").click(() => {
  $("#go").addClass("hide");

  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "buttons");
  document.body.append(mainDiv);

  window.intErval = setInterval(function () {
    let newSec = parseInt($("#timer").text());
    $("#timer").text(--newSec);
  }, 1000);

  setTimeout(() => {
    if (intErval) {
      resultArray = [];
      clearInterval(intErval);
      alert("Game Finish You Didn't Finish On time");
      $("#timer").text("15");
      $("#timerMain").addClass("hide");
      $("#go").removeClass("hide");
      $("#buttons").remove();
    } else {
      clearInterval(intErval);
    }
  }, 15000);

  let setElement = new Set();
  while (setElement.size < 10) {
    setElement.add(Math.ceil(Math.random() * 10));
  }

  let arrayElement = [...setElement];
  let inputs = [];

  arrayElement.forEach((element) => {
    let btn = document.createElement("input");
    btn.value = element;
    btn.setAttribute("onclick", "createSequence(this)");
    btn.setAttribute("readonly", true);
    btn.setAttribute("id", element);
    inputs.push(btn);
  });

  $("#buttons").html(inputs);
  $("#timerMain").removeClass("hide");
});

function createSequence(e) {
  console.count();
  $("#" + e.id).attr("disabled", "disabled");
  $("#" + e.id).addClass("disabled");
  if (resultArray.length < 10) {
    resultArray.push(e.id);
  }
  if (resultArray.length == 10) {
    $.post("game", { result: resultArray }, (xData, status) => {
      switch (status) {
        case "success":
          clearInterval(intErval);
          intErval = false;
          resultArray = [];
          let time = 15 - parseInt($("#timer").text());
          alert(
            "Game Finish \nYou Take " + time + " Seconds\n Result: " + xData
          );
          $("#timer").text("15");
          $("#timerMain").addClass("hide");
          $("#go").removeClass("hide");
          $("#buttons").remove();
          break;
        case "error":
          console.log("There is some Error in Response");
          break;
        case "Not Found":
          console.log("Not Found");
          break;
        default:
          console.log("Default");
          break;
      }
    });
  }
}
