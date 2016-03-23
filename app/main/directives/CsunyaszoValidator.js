/**
 * Example for an async validator
 */
angular.module("main").directive("csunyaszoValidator", function($q, $timeout) {
"use strict";

	return {

		require: "ngModel",

		link: function(scope, element, attrs, ngModel) {

			ngModel.$asyncValidators.csunyaszo = function(modelValue, viewValue) {

				var deferred = $q.defer();

				//simulating some async process
				$timeout(function() {
					if (viewValue.match(/\b(fuck|damn|SimpleBeanFactoryAwareAspectInstanceFactory)\b/i))
						deferred.reject("csúnya szavak!");
					else
						deferred.resolve();
				}, 1000);

				return deferred.promise;
			};
		}
	};
});