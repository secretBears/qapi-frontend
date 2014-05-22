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

		//var lat = scope.coords.latitude;
		//var lon = scope.coords.longitude;
		var lat = 47.809490;
		var lon = 13.055010;

		var token = '42beedb22b46732fc57c88a6b31424a0';
		var url = 'http://qapi.herokuapp.com/api/' + lat + '/' + lon + '?token=' + token;

		$http({method: 'GET', url: url, cache: false})
	    .success(
			function(data) {
				if(Object.prototype.toString.call(data) === '[object Array]'){
					data = data[0];
				}
				if(!scope.checkRespon(data)){
					console.log('ERROR: getting wrong data');
					//TODO: remove fallback
					scope.question = scope.setFallbackQuestions();
					console.log(scope.question);
					return;
				}
				scope.question = data;
				console.log(scope.question);
			}
		)
	    .error(
			function() {
				console.log('ERROR: fetching data from QAPI');
				//TODO: remove fallback
				scope.question = scope.setFallbackQuestions();
				console.log(scope.question);
			}
	    );
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
		}, 2000);
	};

	Game.prototype.checkRespon = function(data){
		return (Object.prototype.toString.call(data) === '[object Object]') &&
			(typeof data.error === 'undefined');
	};

	Game.prototype.setFallbackQuestions = function(){
		var questions = [
			{'question':'Welchen Beruf hat Eberhard Hopf','answers':[{'answer':'Singer, Actor','isTrue':false},{'answer':'Architect','isTrue':false},{'answer':'Politician','isTrue':false},{'answer':'Mathematician','isTrue':true}]},
			{'question':'Welchen Beruf hat Richard Tauber','answers':[{'answer':'Mathematician','isTrue':false},{'answer':'Architect','isTrue':false},{'answer':'Politician','isTrue':false},{'answer':'Singer, Actor','isTrue':true}]},
			{'question':'Welchen Beruf hat Richard Neutra','answers':[{'answer':'Politician','isTrue':false},{'answer':'Mathematician','isTrue':false},{'answer':'Architect','isTrue':true},{'answer':'Singer, Actor','isTrue':false}]},
			{'question':'Welche Art von Musik spielt Wolfgang Amadeus Mozart','answers':[{'answer':'Musical improvisation','isTrue':false},{'answer':'Classical music','isTrue':true},{'answer':'Hard rock','isTrue':false},{'answer':'Serialism','isTrue':false}]},
			{'question':'Welche Art von Musik spielt Anton Webern','answers':[{'answer':'Musical improvisation','isTrue':false},{'answer':'Classical music','isTrue':false},{'answer':'Serialism','isTrue':true},{'answer':'Hard rock','isTrue':false}]},
			{'question':'Welche Art von Musik spielt Dealer','answers':[{'answer':'Serialism','isTrue':false},{'answer':'Classical music','isTrue':false},{'answer':'Hard rock','isTrue':true},{'answer':'Musical improvisation','isTrue':false}]}
		];
		var rand = Math.floor(Math.random()*questions.length);
		return questions[rand];
	};

	if(!instance){
		instance = new Game();
	}

	return instance;
}]);