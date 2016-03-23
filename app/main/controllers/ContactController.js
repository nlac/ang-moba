angular.module("main").controller("ContactController", function($scope, Config) {
"use strict";
	
	//https://docs.angularjs.org/guide/forms
	//http://www.codelord.net/2014/11/02/angularjs-1-dot-3-taste-async-validators/

	$scope.messageModel = {
		fullName: undefined,
		message: undefined
	};

	$scope.onSend = function(contactForm) {
		if (contactForm.$valid)
			window.open("mailto:" + Config.admin + "?subject=" + encodeURIComponent("Contact me - " + $scope.messageModel.fullName) 
				+ "&body=" + encodeURIComponent($scope.messageModel.message));
	};

});