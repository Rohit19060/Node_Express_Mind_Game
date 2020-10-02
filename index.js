const bodyParser = require("body-parser");
const Game = require("./game");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/game", (request, response) => {
  response.json(new Game().sequence(request.body.result));
});

var port = 8080 || process.env.PORT || parseInt(process.argv.pop());

app.listen(port, () => console.log("Example app listening on " + port));
