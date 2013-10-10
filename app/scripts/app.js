'use strict';
angular.module('d3App', ['d3App.directives', 'd3App.controllers', 'd3App.services', 'd3App.random'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
          .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
          .otherwise({ redirectTo: '/' });
    }]);
