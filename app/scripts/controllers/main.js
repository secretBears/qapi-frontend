'use strict';

angular.module('qapiFrontendApp')
  .controller('MainCtrl', ['$scope', '$http', '$window',
	function ($scope, $http, $window) {

		$scope.questioncount = 1;
		$scope.numberofquestions = 10;
		$scope.rightQuestions = 0;

		$scope.getNewQuestion = function(){
			$http({method: 'GET', url: 'http://qapi.herokuapp.com/api/'})
		    .success(function(data) {
		      $scope.qapi = data;
		    })
		    .error(function() {
		      console.log('ERROR: fetching data from QAPI');
				});
		};

		$scope.giveAnswer = function(answer){
			console.log(answer);
			//check Answer

			if($scope.questioncount < $scope.numberofquestions){
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
