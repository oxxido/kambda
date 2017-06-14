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
};

/*================================================================
    LOGIN - $http post
    =================================================================*/
function login(req, res) {
    results.logged = false;
    models.User.findOne({
      where: {
        'username': req.body.user
      }
    }).then(user => {
      if (user == null) {
        results.error = 'Incorrect credentials.';
      } else if (user.password === req.body.pass) {
        results.logged = true;
        results.error = '';
        results.user = user;
      } else {
        results.error = 'Incorrect credentials.';
      }
      return res.json(results);
    })
}
