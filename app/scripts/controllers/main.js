'use strict';

angular.module('qapiFrontendApp').controller('MainCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {

		$scope.game = Game;
		$scope.game.init();
	}
  ]);
