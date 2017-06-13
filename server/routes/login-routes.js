/*================================================================
Server side Routing
Route Definitions
Login routes
=================================================================*/

//var pg = require('pg');

//var database = require('../config/database.js');
var users  = require('../config/auth.json');
//var conString = database.conString;
var results = {};


module.exports = {

    /*================================================================
    LOGIN - $http post
    =================================================================*/
    //create todo and send back all todos after creation
    login : login

};

function login(req, res) {

    console.log(req.body);
    results.user = users.find(x => x.username === req.body.user && x.password === req.body.pass);
    results.logged = !!results.user;
    console.log(results);
    return res.json(results);
}