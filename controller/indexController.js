const express = require("express")
const todo = require("../models").Todo
const router = express.Router();
const Sequelize = require("sequelize")
var Op = Sequelize.Op;

exports.todoForm = async (req,res) => {
    const todos = await todo.findAll({
    })
    res.render("index",{
        todos: todos
    })
}