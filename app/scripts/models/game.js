'use strict';

angular.module('qapiFrontendApp').factory('Game', ['$http', '$window', function($http, $window){
	var instance;

	var Game = function Game(){
		this.numberofquestions = 10;
		this.rightQuestions = 0;
		this.givenAnswers = [];
		this.questioncount = 0;
		this.question = {};
	};

	Game.prototype.getNewQuestion = function(){
		var scope = this;

		$http({method: 'GET', url: 'http://qapi.herokuapp.com/api/'})
	    .success(function(data) {
	      scope.question = data;
	    })
	    .error(function() {
	      console.log('ERROR: fetching data from QAPI');
	      //TODO: remove fallback
	      scope.question = {'id':20,'question':'Frage 20','place':'Linz', 'answers':[{'answer':'20 answer 1','isTrue':false},{'answer':'20 answer 2','isTrue':true},{'answer':'20 answer 3', 'isTrue':false},{'answer':'20 answer 4','isTrue':false}]};
			});
	};

	Game.prototype.giveAnswer = function(answer){
		var givenAnswer = {};
		givenAnswer.question = this.question.question;
		givenAnswer.answer = answer;

		//check Answer
		var isTrue = false;
		for(var i=0; i<this.question.answers.length; i++){
			var a = this.question.answers[i];
			if(a.isTrue){
				givenAnswer.rightAnswer = a.answer;
			}
			if(a.answer === answer){
				isTrue = a.isTrue;
			}
		}

		givenAnswer.isTrue = isTrue;

		this.givenAnswers.push(givenAnswer);

		if(isTrue){
			this.rightQuestions++;
		}

		if(this.questioncount < this.numberofquestions - 1){
			this.getNewQuestion();
			this.questioncount++;
		}
		else{
			$window.location.href = '/#/finish';
		}
	};

	if(!instance){
		instance = new Game();
	}

	return instance;
}]);