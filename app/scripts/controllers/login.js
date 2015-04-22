'use strict';

angular.module('myApp')

.controller('LoginController', ['$rootScope', '$scope', 'ParseSDK', '$modal', '$location', function($rootScope, $scope, ParseService, $modal, $location) {

	 $scope.init = function() {
		$scope.user = $rootScope.user;
		$scope.logged = $rootScope.logged;
		$scope.allowLogin = true;
		$scope.allowSingin = false;

		var currentUser = Parse.User.current();
		if (currentUser != undefined) {
			$scope.logged = true;
			$scope.user = currentUser.get('fullname');
			$rootScope.login = currentUser.get('username');
			
			ParseService.validateLoggedUser();
		}
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'LoginModalController',
			size: size,
			resolve: {
				ParseService: function () {
					return ParseService;
				}
			}
		});

		modalInstance.result.then(function () {
			ParseService.validateLoggedUser();
		});
	};

	$scope.logoff = function() {
		ParseService.logout();
	};
	
}])

.controller('LoginModalController', function($rootScope, $scope, $modalInstance, ParseService) {

	$scope.login = function () {
		var promise = ParseService.login($scope);

		promise.done(function() {
			if ($rootScope.logged) {
				$modalInstance.close();
			}
		});
	};

	$scope.create = function () {
		var newUser = new Parse.User();

		newUser.set('username', $scope.email);
		newUser.set('email', 	$scope.email);
		newUser.set('password',	$scope.password);
		newUser.set('fullname', $scope.fullname);

		newUser.signUp (null, {
			success: function(user) {
				$modalInstance.close();
			},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
});