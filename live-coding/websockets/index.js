const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(join(__dirname, "/style.css"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(join(__dirname, "/script.js"));
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
