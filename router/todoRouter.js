const express = require("express");
const router = express.Router();
// const Todo = require("../models").Todo
const todoController = require("../controller/todoController");

router.route("/").get(todoController.allTodo).post(todoController.createTodo).delete(todoController.deleteTodo);

module.exports = router;