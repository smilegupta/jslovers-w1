const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let posts = [];
const waitingClients = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

app.get("/api/posts", (req, res) => {
  if (req.query.longPolling === "true") {
    waitingClients.push(res);
  } else {
    res.json({ posts });
  }
});

app.post("/api/post", (req, res) => {
  const { user, text } = req.body;
  const newPost = { user, text, timestamp: new Date() };
  posts.push(newPost);

  waitingClients.forEach((client) => {
    client.json({ posts });
  });

  res.json({ success: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
