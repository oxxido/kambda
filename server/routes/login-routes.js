/*================================================================
Server side Routing
Route Definitions
Login routes
=================================================================*/

//var pg = require('pg');

//var database = require('../config/database.js');
const users  = require('../config/auth.json');
//var conString = database.conString;
let results = {};
var models  = require('../models');

module.exports = {
    login,
    getUsers,
};

/*================================================================
    LOGIN - $http post
    =================================================================*/
function logins(req, res) {

    console.log(req.body);
    results.user = users.find(x => x.username === req.body.user && x.password === req.body.pass);
    results.logged = !!results.user;
    console.log(results);
    return res.json(results);
}

function login(req, res) {
    results.logged = false;
    models.User.findOne({
      where: {
        'username': req.body.user
      }
    }).then(function (user) {
      if (user == null) {
        results.error = 'Incorrect credentials.';
      } else if (user.password === req.body.pass) {
        results.logged = true;
        results.user = user;
      } else {
        results.error = 'Incorrect credentials.';
      }
      return res.json(results);
    })
}

/*================================================================
    USERS - $http get
    =================================================================*/

function getUsers(req, res) {
    models.User.findAll()
        .then(users => {
            results.users = users;
            return res.json(results);
        })
}