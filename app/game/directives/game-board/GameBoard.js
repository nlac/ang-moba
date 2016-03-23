angular.module("game").directive("gameBoard", function($compile, $templateCache) {
"use strict";

	return {
		restrict : "A",
		templateUrl : "app/game/directives/game-board/game-board.html",
		scope: {
			options : "=gameBoard"
		},

		controller: function($scope, $injector, RTC) {

			$scope.myTurn = false;
			$scope.board = undefined;
			$scope.message = undefined;

			$scope.boardEnabled = function() {
				if ($scope.board && $scope.board.winner)
					return false;
				return RTC.connected() && $scope.myTurn;
			};

			$scope.init = function() {

				if (!$scope.options.channelName) {
					//channelName gets value here
					$scope.options.channelName = RTC.open();
					$scope.message = "Created game " + $scope.options.channelName + ". Send this ID to your partner. Waiting for the partner to connect...";
				} else {
					RTC.connect($scope.options.channelName);
					$scope.message = "Joining to game " + $scope.options.channelName + "...";
				}
			};


			$scope.$on("rtc_onopen", function() {

				//2 peers connected
				$scope.myTurn = true;
				$scope.message = "Connection established with the remote user. Let's play!";
				
				//"Constructing" the board
				$scope.board = $scope.options.board;
				
				$scope.$digest();
			});

			/**
			 * Local player takes a step with it
			 * @param {Cell} cell [description]
			 */
			$scope.step = function(cell) {
				if (!$scope.boardEnabled() || cell.gamer)
					return;

				$scope.board.step($scope.board.gamer, cell.r, cell.c);
				$scope.message = $scope.board.winner ? "You won!" : "Step taken. Waiting for the remote user to step...";
				$scope.myTurn  = false;
				
				RTC.send(cell.toJson());
			};

			/**
			 * Remote user took a step - this is triggered
			 * @param {[type]} event    [description]
			 * @param {[type]} message) {				var     step [description]
			 * @return {[type]} [description]
			 */
			$scope.$on("rtc_onmessage", function(event, message) {
				var step = JSON.parse(message);
				$scope.board.step(step.gamer, step.r, step.c);

				$scope.message = $scope.board.winner ? "You've lost!" : "The remote user took a step. Your turn!";
				$scope.myTurn = true;
				
				$scope.$digest();
			});

			$scope.$on("rtc_onleave", function() {
				$scope.message = " The remote user has left the game.";
				$scope.options.channelName = "";
				
				$scope.$digest();
			});

			$scope.$on("$destroy", function() {
				RTC.leave();
			});

			$scope.init();
		}
	};
});