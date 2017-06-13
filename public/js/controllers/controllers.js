'use strict';

/*================================================
Module - for the Controllers
================================================ */
angular.module('postgreDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($rootScope, $scope, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService) {

    $rootScope.bodyClass="";
	$scope.formData = {};
	$scope.todos={};
    $scope.bodyClass="gradient-body";

	/*
	 * Get Todos
	 */
	getTodosService.getTodos()
		.then(function(answer) {
			$scope.todos = answer;
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);


	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {
		createTodoService.createTodo($scope.formData)
			.then(function(answer) {
				$scope.todos = answer;
                //reset input
                $scope.formData.text = '';
			},
			function(error) {
				console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, txt, isDone) {

		var updateData = {"text":txt, "done": isDone};

		updateTodoService.updateTodo(id, updateData)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id) 
	{
		deleteTodoService.deleteTodo(id)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
			}
	  	);

	};
})


/**
 * Controller - MainCtrl
 */
.controller('LoginCtrl', loginCtrl);

loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'loginService'];

function loginCtrl($rootScope, $scope, $location, $http, loginService) {

    // state
    $rootScope.bodyClass="gradient-body";
    $scope.login = "Hola";
    $scope.user = {
        email: '',
        pass: '',
    };
    $scope.errors = [];
    $scope.isLoggingIn = false;

    //methods
    $scope.login = login;

    function login() {
        $scope.isLoggingIn = true;
        loginService.login($scope.user.email, $scope.user.pass)
        .then(function(response) {
            console.log(response);
            $scope.isLoggingIn = false;
            if(response.data.logged) {
                $location.path( "/todos" );
            } else {
                $scope.errors.push(response.data.error || 'Wrong data, please try again');
            }
        });
    }

}