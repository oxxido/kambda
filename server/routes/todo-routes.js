/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

=================================================================*/

const pg = require('pg');
const database = require('../config/database.js');
const conString = database.conString;
var models  = require('../models');
let results = [];

//simplify reading by adding definitions on top
module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
}

function getTodos(req, res) {

    const response = {};
    models.Todo.findAll()
    .then(todo => {
        response.todos = todo;
        return res.json(response);
    });
}

function createTodo(req, res) {

    const response = {};
    const data = {
        text : req.body.text,
        done : false
    };

    models.Todo.create(data)
    .then(result => {
        response.result = result;
        models.Todo.findAll()
        .then(todo => {
            response.todos = todo;
            return res.json(response);
        });
    });
}

function updateTodo(req, res) {
    const response = {};
    const id = req.params.todo_id;
    const data = {
        text : req.body.text,
        done: req.body.done
    };
    models.Todo.update(
        data,
        { where: {
            id: id
        }
    })
    .then(result => {
        response.result = result;
        models.Todo.findAll()
        .then(todo => {
            response.todos = todo;
            return res.json(response);
        });
    })
    .catch(err => {
        response.error = err;
        return res.json(response);
    });
}

function deleteTodo(req, res) {
    const response = {};
    var id = req.params.todo_id;
    models.Todo.destroy({
        where: {
            id: id
        }
    })
    .then(result => {
        response.result = result;
        models.Todo.findAll()
        .then(todo => {
            response.todos = todo;
            return res.json(response);
        });
    })
    .catch(err => {
        response.error = err;
        return res.json(response);
    });
}
