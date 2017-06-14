/*================================================================
	Server side Routing
	Route Declarations

=================================================================*/

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var todoRoutes = require('./routes/todo-routes.js');	//Exchange routes
var loginRoutes = require('./routes/login-routes.js');

module.exports = function(app) {

	/*================================================================
	ROUTES
	=================================================================*/
	app.post('/api/todos', todoRoutes.createTodo);
	app.get('/api/todos', todoRoutes.getTodos);
	app.put('/api/todos/:todo_id', todoRoutes.updateTodo);
	app.delete('/api/todos/:todo_id', todoRoutes.deleteTodo);
    app.post('/api/login/', loginRoutes.login);
    app.get('/api/get_users/', loginRoutes.getUsers);
};