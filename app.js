const bodyParser = require("body-parser");
const Game = require("./game");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("docs"));

app.post("/game", (request, response) => {
  response.json(new Game().sequence(request.body.result));
});

const port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}/`)
);
