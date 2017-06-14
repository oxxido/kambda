/*================================================
Ref.
https://docs.angularjs.org/api/ng/service/$q
https://github.com/kriskowal/q
http://www.benlesh.com/2013/02/angularjs-creating-service-with-http.html
http://andyshora.com/promises-angularjs-explained-as-cartoon.html
================================================ */

'use strict';
/*================================================
Module - for the Services
================================================ */
angular.module('postgreDbApp.services', [])

/**
 * getTodos - Factory Service
 */
.factory('getTodosService', function($http, $q) {

	/*================================================================
	READ - $http get
	=================================================================*/
	var getTodos = function(hash) {
	    
    	var deferred = $q.defer();

        $http.get('/api/todos/?hash='+hash)
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        getTodos: getTodos
    };
})



/**
 * Create Todo - Factory Service
 */
.factory('createTodoService', function($http, $q) {

	/*================================================================
	CREATE - $http post
	=================================================================*/
	var createTodo = function(todo, hash) {
	    
    	var deferred = $q.defer();

        $http.post('/api/todos/?hash='+hash, todo)
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        createTodo: createTodo
    } 
})



/**
 * Update Todo - Factory Service
 */
.factory('updateTodoService', function($http, $q) {

	/*================================================================
	UPDATE - $http put
	=================================================================*/
	var updateTodo = function(id, updateData, hash) {
	    
    	var deferred = $q.defer();

        $http.put('/api/todos/' + id + '/?hash='+hash , updateData)
        .success(function(data) {
        	console.log("Success");//TEST
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	console.log("Error");//TEST
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        updateTodo: updateTodo
    } 
})


/**
 * Delete Todo - Factory Service
 */
.factory('deleteTodoService', function($http, $q) {

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	var deleteTodo = function(id, hash) {
	    
    	var deferred = $q.defer();

        $http.delete('/api/todos/' + id + '/?hash='+hash)        
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        deleteTodo: deleteTodo
    } 
})

/**
 * Login - Factory Service
 */
.factory('loginService', function($http, $q, $httpParamSerializer) {

    /*================================================================
    Login - $http post
    =================================================================*/
    var login = function(user, pass) {

        return $http.post('/api/login/', {
            'user': user,
            'pass': pass
        });

    }

    //Return Factory Object
    return {
        login: login
    }
});