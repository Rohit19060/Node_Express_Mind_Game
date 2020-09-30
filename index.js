const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Game = require("./game");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/game", (request, response) => {
  response.json(new Game().sequence(request.body.result));
});

var port = 8080 || process.env.PORT || parseInt(process.argv.pop());

app.listen(port, () =>
  console.log("Example app listening on http://localhost:" + port)
);
