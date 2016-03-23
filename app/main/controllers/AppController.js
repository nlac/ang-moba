angular.module("main").controller("AppController", function($scope, $location) {
"use strict";
	
	$scope.isActive = function(path) {
		var currentPath = $location.path();
		if (path === "/")
			return currentPath === "/";
		
		return currentPath.indexOf(path) === 0;
	};

	$scope.navItems = [
		{text: "Game", url:"/game"},
		{text: "Contact us", url:"/contact"}
	];

});