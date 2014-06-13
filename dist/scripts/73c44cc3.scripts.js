"use strict";angular.module("qapiFrontendApp",["ngCookies","ngResource","ngSanitize","ngRoute","angular-loading-bar"]).config(["$routeProvider","cfpLoadingBarProvider",function(a,b){a.when("/",{templateUrl:"views/index.html",controller:"MainCtrl"}).when("/play",{templateUrl:"views/play.html",controller:"PlayCtrl"}).when("/about/",{templateUrl:"views/about.html",controller:"MainCtrl"}).when("/finish/",{templateUrl:"views/finish.html",controller:"FinishCtrl"}).otherwise({redirectTo:"/"}),b.includeBar=!1}]).run(["$rootScope",function(a){a.menuhidden=!0,a.username="Justin Bieber",a.isPlaying=!1,a.toggleMenu=function(){a.menuhidden=!a.menuhidden}}]),angular.module("qapiFrontendApp").factory("Game",["$http","$window","$timeout","$rootScope",function(a,b,c,d){var e,f=function(){this.reset()};return f.prototype.reset=function(){this.numberofquestions=10,this.rightQuestions=0,this.givenAnswers=[],this.questioncount=1,this.question={},this.questionGiven=!0,this.coords={}},f.prototype.init=function(){var a=this;navigator.geolocation.getCurrentPosition(function(b){a.coords=b.coords,a.getNewQuestion()})},f.prototype.getNewQuestion=function(){var b=this;b.selectedAnswer=-1,b.indexOfRightAnswer=-1,b.questionGiven=!1,d.isPlaying=!0;var c=47.80949,e=13.05501,f="42beedb22b46732fc57c88a6b31424a0",g="http://qapi.herokuapp.com/api/"+c+"/"+e+"?token="+f;g+="&_="+(new Date).getTime(),a({method:"GET",url:g,cache:!1}).success(function(a){return"[object Array]"===Object.prototype.toString.call(a)&&(a=a[0]),b.checkRespon(a)?void(b.question=a):(console.log("ERROR: getting wrong data"),void(b.question=b.setFallbackQuestions()))}).error(function(){console.log("ERROR: fetching data from QAPI"),b.question=b.setFallbackQuestions()})},f.prototype.giveAnswer=function(a,e){var f=this;if(!f.questionGiven){this.questionGiven=!0,f.selectedAnswer=e;var g={};g.question=f.question.question,g.answer=a;for(var h,i=0;i<f.question.answers.length;i++){var j=f.question.answers[i];j.isTrue&&(h=j.answer,f.indexOfRightAnswer=i)}a===h&&f.rightQuestions++,g.isTrue=a===h,g.rightAnswer=h,f.givenAnswers.push(g),c(function(){f.questioncount<f.numberofquestions?(f.getNewQuestion(),f.questioncount++):(d.isPlaying=!1,b.location.href="/#/finish")},2e3)}},f.prototype.checkRespon=function(a){return"[object Object]"===Object.prototype.toString.call(a)&&"undefined"==typeof a.error},f.prototype.setFallbackQuestions=function(){var a=[{question:"Welchen Beruf hat Eberhard Hopf",answers:[{answer:"Singer, Actor",isTrue:!1},{answer:"Architect",isTrue:!1},{answer:"Politician",isTrue:!1},{answer:"Mathematician",isTrue:!0}]},{question:"Welchen Beruf hat Richard Tauber",answers:[{answer:"Mathematician",isTrue:!1},{answer:"Architect",isTrue:!1},{answer:"Politician",isTrue:!1},{answer:"Singer, Actor",isTrue:!0}]},{question:"Welchen Beruf hat Richard Neutra",answers:[{answer:"Politician",isTrue:!1},{answer:"Mathematician",isTrue:!1},{answer:"Architect",isTrue:!0},{answer:"Singer, Actor",isTrue:!1}]},{question:"Welche Art von Musik spielt Wolfgang Amadeus Mozart",answers:[{answer:"Musical improvisation",isTrue:!1},{answer:"Classical music",isTrue:!0},{answer:"Hard rock",isTrue:!1},{answer:"Serialism",isTrue:!1}]},{question:"Welche Art von Musik spielt Anton Webern",answers:[{answer:"Musical improvisation",isTrue:!1},{answer:"Classical music",isTrue:!1},{answer:"Serialism",isTrue:!0},{answer:"Hard rock",isTrue:!1}]},{question:"Welche Art von Musik spielt Dealer",answers:[{answer:"Serialism",isTrue:!1},{answer:"Classical music",isTrue:!1},{answer:"Hard rock",isTrue:!0},{answer:"Musical improvisation",isTrue:!1}]}],b=Math.floor(Math.random()*a.length);return a[b]},e||(e=new f),e}]),angular.module("qapiFrontendApp").controller("PlayCtrl",["$scope","$http","$window","Game",function(a,b,c,d){a.game=d,a.game.reset(),a.game.init()}]),angular.module("qapiFrontendApp").controller("FinishCtrl",["$scope","$http","$window","Game",function(a,b,c,d){a.game=d}]),angular.module("qapiFrontendApp").controller("MainCtrl",[function(){}]),angular.module("qapiFrontendApp").controller("GameCtrl",["$scope","$http","$window","Game",function(a,b,c,d){a.game=d,a.game.numberofquestions=a.game.numberofquestions||0,a.game.rightQuestions=a.game.rightQuestions||0}]);