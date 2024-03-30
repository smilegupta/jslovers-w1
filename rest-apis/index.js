// const express = require('express');
import express from "express";
// body parser is a middleware that helps to parse the incoming request body
import bodyParser from "body-parser";

const todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React",
    completed: false,
  },
  {
    id: 3,
    title: "Learn MongoDB",
    completed: false,
  },
  {
    id: 4,
    title: "Learn MongoDB",
    completed: false,
  },
];

const app = express();
app.use(bodyParser.json());

app.all("/", (req, res) => {
  res.send("I am up and running!");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);

  res.json({
    message: "new todo added",
    status: "success",
  });
});

app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const originalId = Number(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === originalId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: originalId,
      ...newTodoData,
    };
    res.json({
      message: "Todo updated",
      status: "success",
    });
  } else {
    res.json({
      message: "Todo not found",
      status: "error",
    });
  }
});

app.delete("/todos/:id", (req, res) => { 
  const originalId = Number(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === originalId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.json({
      message: "Todo deleted",
      status: "success",
    });
  } else {
    res.json({
      message: "Todo not found",
      status: "error",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
