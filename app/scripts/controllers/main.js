'use strict';

angular.module('qapiFrontendApp').controller('PlayCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {
		$scope.game = Game;
		$scope.game.reset();
		$scope.game.init();
	}
  ]);

angular.module('qapiFrontendApp').controller('FinishCtrl', ['$scope', '$http', '$window', 'Game',
	function ($scope, $http, $window, Game) {

		$scope.game = Game;
	}
  ]);

angular.module('qapiFrontendApp').controller('MainCtrl', [
	function () {
		//TODO
	}
]);
