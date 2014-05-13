'use strict';

angular.module('qapiFrontendApp').controller('MainCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {

		$scope.game = Game;
		$scope.questioncount = 1;
		$scope.game.numberofquestions = 10;
		$scope.game.rightQuestions = 0;

		$scope.getNewQuestion = function(){
			$http({method: 'GET', url: 'http://qapi.herokuapp.com/api/'})
		    .success(function(data) {
		      $scope.qapi = data;
		    })
		    .error(function() {
		      console.log('ERROR: fetching data from QAPI');
		      //TODO: remove fallback
		      $scope.qapi = {'id':20,'question':'Frage 20','place':'Linz', 'answers':[{'answer':'20 answer 1','isTrue':false},{'answer':'20 answer 2','isTrue':true},{'answer':'20 answer 3', 'isTrue':false},{'answer':'20 answer 4','isTrue':false}]};
				});
		};

		$scope.giveAnswer = function(answer){
			console.log(answer);
			//check Answer
			for(var i=0; i<$scope.qapi.answers.length; i++){
				var a = $scope.qapi.answers[i];
				if(a.answer === answer && a.isTrue){
					$scope.game.rightQuestions++;
					break;
				}
			}

			if($scope.questioncount < $scope.game.numberofquestions){
				$scope.getNewQuestion();
				$scope.questioncount++;
			}
			else{
				$window.location.href = '/#/finish';
			}
		};

		$scope.getNewQuestion();
	}
  ]);
