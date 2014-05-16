'use strict';

angular.module('qapiFrontendApp').factory('Game', ['$http', '$window', '$timeout', '$rootScope',
	function($http, $window, $timeout, $rootScope){
	var instance;

	var Game = function Game(){
		this.reset();
	};

	Game.prototype.reset = function(){
		this.numberofquestions = 10;
		this.rightQuestions = 0;
		this.givenAnswers = [];
		this.questioncount = 1;
		this.question = {};
		this.questionGiven = true;
		this.coords = {};
		this.loading = 0;
	};

	Game.prototype.init = function(){
		var scope = this;
		navigator.geolocation.getCurrentPosition(
			function(data){
				scope.coords = data.coords;
				scope.getNewQuestion();
			}
		);
	};

	Game.prototype.getNewQuestion = function(){
		var scope = this;
		scope.selectedAnswer = -1;
		scope.indexOfRightAnswer = -1;
		scope.questionGiven = false;
		$rootScope.isPlaying = true;

		var lat = scope.coords.latitude;
		var lon = scope.coords.longitude;

		var url = 'http://qapi.herokuapp.com/api/' + lat + '/' + lon;

		scope.loading++;
		$http({method: 'GET', url: url})
	    .success(function(data) {
	      scope.question = data;
	      scope.loading--;
	    })
	    .error(function() {
	      console.log('ERROR: fetching data from QAPI');
	      //TODO: remove fallback
	      scope.loading--;
	      scope.question = {'id':20,'question':'Frage 20','place':'Linz', 'answers':[{'answer':'20 answer 1','isTrue':false},{'answer':'20 answer 2','isTrue':true},{'answer':'20 answer 3', 'isTrue':false},{'answer':'20 answer 4','isTrue':false}]};
			});
	};

	Game.prototype.giveAnswer = function(answer, index){
		var scope = this;

		if(scope.questionGiven){
			return;
		}
		this.questionGiven = true;

		scope.selectedAnswer = index;

		var givenAnswer = {};
		givenAnswer.question = scope.question.question;
		givenAnswer.answer = answer;

		//check Answer
		var rightAnswer;
		for(var i=0; i<scope.question.answers.length; i++){
			var a = scope.question.answers[i];
			if(a.isTrue){
				rightAnswer = a.answer;
				scope.indexOfRightAnswer = i;
			}
		}

		if(answer === rightAnswer){
			scope.rightQuestions++;
		}

		givenAnswer.isTrue = (answer === rightAnswer);
		givenAnswer.rightAnswer = rightAnswer;
		scope.givenAnswers.push(givenAnswer);

		$timeout(function(){
			if(scope.questioncount < scope.numberofquestions){
				scope.getNewQuestion();
				scope.questioncount++;
			}
			else{
				$rootScope.isPlaying = false;
				$window.location.href = '/#/finish';
			}
		}, 200);
	};

	if(!instance){
		instance = new Game();
	}

	return instance;
}]);