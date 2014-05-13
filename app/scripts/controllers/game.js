'use strict';

angular.module('qapiFrontendApp').controller('GameCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {
		$scope.game = Game;
		$scope.game.numberofquestions = $scope.game.numberofquestions || 0;
		$scope.game.rightQuestions = $scope.game.rightQuestions || 0;
	}
  ]);
