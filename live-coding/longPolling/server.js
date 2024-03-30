const express = require("express");

const app = express();

app.use(express.json());

let posts = [];
let waitingClients = [];

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
  console.log("Request received");
  console.log(req.query);
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

  waitingClients = [];

  res.json({ success: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
