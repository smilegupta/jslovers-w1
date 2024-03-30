const express = require("express");

const app = express();

app.use(express.json());

let posts = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
