import express from "express";

import bodyParser from "body-parser";



const app = express();
app.use(bodyParser.json());

const todos = [
  { id: 1, title: "Todo 1", completed: false },
  {
    id: 2,
    title: "Todo 2",
    completed: true,
  },
  {
    id: 3,
    title: "Todo 3",
    completed: false,
  },
];

app.all("/", (req, res) => {
  res.send("Hello World !!!!!");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => { 
  console.log(req);
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({
      message: "Todo not found",
      status: "error",
    });
  }
});

app.post("/todos", (req, res) => { 
  const newTodo = req.body;
  todos.push(newTodo);

  res.json({
    message: "new todo added",
    status: "success",
  })
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
