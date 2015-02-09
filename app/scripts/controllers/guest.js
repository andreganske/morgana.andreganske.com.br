'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', function($rootScope, $scope) {
	
	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

}]);