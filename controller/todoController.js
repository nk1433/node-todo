const express = require("express")
const todo = require("../models").Todo
const router = express.Router();
const Sequelize = require("sequelize")
var Op = Sequelize.Op;

exports.createTodo = (req,res) => {
    todo.create({
        name: req.body.name
    }).then((todo) => {
        if(todo){
            // return res.redirect("/")
            // return category
            res.json({
                message: "success"
            })
        }
        else{
            res.json({
                message: "error"
            })
        }
    })
    
}


exports.allTodo = async (req,res) => {
    const todos = await todo.findAll({
    })
    res.json({
        todos: todos
    });
    // return todos
}

exports.deleteTodo = async (req,res,next) => {
    todo.destroy(
    {
        where: {
            id: {
                [Op.eq]: req.params.category_id,
            }
        }
    }
    ).then((data) =>{
        if(data){
            res.redirect("/")
            // res.json({
            //     message: "success"
            // })
        }
        else{
            res.json({
                message: "ID does not exists"
            })
        }
    })
}