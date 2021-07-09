const express = require("express");
const router = express.Router();
// const Todo = require("../models").Todo
const todoController = require("../controller/todoController");

router.route("/").get(todoController.allTodo).post(todoController.createTodo);
router.route("/:todo_id").delete(todoController.deleteTodo);

module.exports = router;