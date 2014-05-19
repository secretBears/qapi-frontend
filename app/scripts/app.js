'use strict';

angular
  .module('qapiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-loading-bar'
  ])
  .config(['$routeProvider', 'cfpLoadingBarProvider', function ($routeProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/finish/', {
        templateUrl: 'views/finish.html',
        controller: 'FinishCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    cfpLoadingBarProvider.includeBar = false;
  }])
  .run(['$rootScope', function($rootScope){

    $rootScope.menuhidden = true;
    $rootScope.username = 'Justin Bieber';
    $rootScope.isPlaying = false;

    $rootScope.toggleMenu = function(){
      $rootScope.menuhidden = !$rootScope.menuhidden;
    };
  }]);
