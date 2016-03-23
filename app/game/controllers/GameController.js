angular.module("game").controller("GameController", function($scope, $routeParams, $location, RTC, AmobaGame, Config) {
"use strict";
	
	RTC.leave();

	//RTC channel name from URL
	$scope.channelName = $routeParams.gameId;

	$scope.createBoard = function(initiator) {

		//config object of the GameBoard directive
		$scope.boardOptions = {
			channelName: $scope.channelName,
			board: new AmobaGame.Board({
				rows: Config.board.rows,
				cols: Config.board.cols,
				gamer: initiator ? "x" : "o"
			})
		};
	};

	//Button handlers
	$scope.startNewGame = function() {

		if ($scope.channelName) {
			
			$location.path("/game");
			location.reload();

		} else {

			$scope.createBoard( true );

		}
	}
	
	$scope.joinToGame = function() {
		if ($scope.channelName) {
			$scope.createBoard( false );
		}
	}
	
	$scope.leaveGame = function() {
		$location.path("/game");
		location.reload();
	}

	//game from url
	if ($scope.channelName)
		$scope.createBoard(false);

});