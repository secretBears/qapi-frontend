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
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/finish/', {
        templateUrl: 'views/finish.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', function($rootScope){
    $rootScope.menuhidden = true;
    $rootScope.username = 'Justin Bieber';

    $rootScope.toggleMenu = function(){
      $rootScope.menuhidden = !$rootScope.menuhidden;
    };
  }]);
