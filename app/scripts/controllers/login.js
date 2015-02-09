'use strict';

angular.module('myApp')

.controller('LoginController', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

	 $scope.init = function() {
		$scope.allowLogin = $rootScope.allowLogin;
		$scope.allowSingin = $rootScope.allowSingin;

		var currentUser = Parse.User.current();
		$scope.logged = currentUser ? true : false;
		$scope.user = currentUser.get('fullname');
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'ModalController',
			size: size
		});

		modalInstance.result.then(function () {
			var currentUser = Parse.User.current();
			$scope.logged = currentUser ? true : false;
			$scope.user = currentUser.get('fullname');
			
			if ($scope.user === 'admin') {
				$location.path('/admin');
			} else {
				$location.path('/guest');
			}
		});
	};

	$scope.logoff = function() {
		Parse.User.logOut();
		$location.path('/');
	};
}]);