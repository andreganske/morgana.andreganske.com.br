'use strict';

angular.module('myApp')

.controller('LoginController', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

	 $scope.init = function() {
		$scope.user = $rootScope.user;
		$scope.logged = $rootScope.logged;
		$scope.allowLogin = $rootScope.allowLogin;
		$scope.allowSingin = $rootScope.allowSingin;
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'ModalController',
			size: size
		});
	};

	$scope.logoff = function() {
		Parse.User.logOut();
		$location.path('/');
	};
}]);