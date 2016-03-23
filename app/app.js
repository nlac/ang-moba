(function(angular) {
"use strict";

	//Define modules
	angular.module("game", []);
	var main = angular.module("main", ["ngRoute", "game"]);

	//Setup some app constants
	main.constant("Config", {
		board : {
			rows : 15,
			cols : 15
		},
		rtc : {
			firebase : "webrtc-experiment"
		},
		admin: "admin@admin.com"
	});

	//Setup navigation
	main.config(function($routeProvider) {
		$routeProvider
		.when("/", {
			controller: "AppController",
			templateUrl: "app/main/views/home.html"
		})
		.when("/game/:gameId?", {
			controller: "GameController",
			templateUrl: "app/game/views/game.html"
		})
		.when("/contact", {
			controller: "ContactController",
			templateUrl: "app/main/views/contact.html"
		})
		.otherwise({ redirectTo: "/"})
	});

})(window.angular);