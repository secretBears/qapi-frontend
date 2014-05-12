'use strict';

angular
  .module('qapiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', function($rootScope){
    $rootScope.menuhidden = true;

    $rootScope.toggleMenu = function(){
      $rootScope.menuhidden = !$rootScope.menuhidden;
    };
  }]);
