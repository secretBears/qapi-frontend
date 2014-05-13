"use strict";angular.module("qapiFrontendApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about/",{templateUrl:"views/about.html",controller:"MainCtrl"}).when("/finish/",{templateUrl:"views/finish.html",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.menuhidden=!0,a.username="Justin Bieber",a.toggleMenu=function(){a.menuhidden=!a.menuhidden}}]),angular.module("qapiFrontendApp").factory("Game",["$http","$window","$timeout",function(a,b,c){var d,e=function(){this.numberofquestions=10,this.rightQuestions=0,this.givenAnswers=[],this.questioncount=1,this.question={},this.questionGiven=!0};return e.prototype.getNewQuestion=function(){var b=this;b.selectedAnswer=-1,b.indexOfRightAnswer=-1,b.questionGiven=!1,a({method:"GET",url:"http://qapi.herokuapp.com/api/"}).success(function(a){b.question=a}).error(function(){console.log("ERROR: fetching data from QAPI"),b.question={id:20,question:"Frage 20",place:"Linz",answers:[{answer:"20 answer 1",isTrue:!1},{answer:"20 answer 2",isTrue:!0},{answer:"20 answer 3",isTrue:!1},{answer:"20 answer 4",isTrue:!1}]}})},e.prototype.giveAnswer=function(a,d){var e=this;if(!e.questionGiven){this.questionGiven=!0,e.selectedAnswer=d;var f={};f.question=e.question.question,f.answer=a;for(var g,h=0;h<e.question.answers.length;h++){var i=e.question.answers[h];i.isTrue&&(g=i.answer,e.indexOfRightAnswer=h)}a===g&&e.rightQuestions++,f.isTrue=a===g,f.rightAnswer=g,e.givenAnswers.push(f),c(function(){e.questioncount<e.numberofquestions?(e.getNewQuestion(),e.questioncount++):b.location.href="/#/finish"},2e3)}},d||(d=new e),d}]),angular.module("qapiFrontendApp").controller("MainCtrl",["$scope","$http","$window","Game",function(a,b,c,d){a.game=d,a.game.getNewQuestion()}]),angular.module("qapiFrontendApp").controller("GameCtrl",["$scope","$http","$window","Game",function(a,b,c,d){a.game=d,a.game.numberofquestions=a.game.numberofquestions||0,a.game.rightQuestions=a.game.rightQuestions||0}]);