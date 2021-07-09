const express = require("express");
const router = express.Router();
const todoController = require("../controller/indexController")

router.route("/").get(todoController.todoForm);

module.exports = router;