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
function checkHash(req, res, hash, callback) {
    models.User.findOne({
      where: {
        'hash': req.query.hash
      }
    }).then(user => {
      if (user == null) {
        return res.status(401).json({error: 'You are not authorized'});
        //return res.json({error: 'You are not authorized'});
      } else {
        callback(req, res);
      }
    }).catch(error => {
        console.log(error);
    });
}

function getTodos(req, res) {
    checkHash(req, res, req.query.hash, getTodosCallback);
}
function createTodo(req, res) {
    checkHash(req, res, req.query.hash, createTodoCallback);
}
function updateTodo(req, res) {
    checkHash(req, res, req.query.hash, updateTodoCallback);
}
function deleteTodo(req, res) {
    checkHash(req, res, req.query.hash, deleteTodoCallback);
}

function getTodosCallback(req, res) {
    const response = {};
    models.Todo.findAll()
    .then(todo => {
        response.todos = todo;
        return res.json(response);
    });
}

function createTodoCallback(req, res) {

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

function updateTodoCallback(req, res) {
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

function deleteTodoCallback(req, res) {
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
