'use strict';

/*================================================
Module - Main App Module
================================================ */
angular.module('postgreDbApp', ['ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services', 'ui.bootstrap'])


.config(function ($routeProvider, $locationProvider) {

  /*================================================
  Define all the Routes
  Ref.
  https://docs.angularjs.org/api/ng/provider/$locationProvider
  ================================================ */
	$routeProvider
    
    .when('/todos', {
        templateUrl: 'views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
    })
    .when('/', {
        templateUrl: 'views/login.tpl.html',
        controller: 'LoginCtrl',
        reloadOnSearch: false
    })
    
    .otherwise({
        redirectTo: '/'
    });
      

    /*$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/

  });