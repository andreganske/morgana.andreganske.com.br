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
			size: size
		});

		modalInstance.result.then(function () {
			ParseService.validateLoggedUser();
		});
	};

	$scope.logoff = function() {
		Parse.User.logOut();
		$location.path('/');
	};
}])

.controller('LoginModalController', function($rootScope, $scope, $modalInstance) {

	$('#loginError').alert();
	$('#unknowError').alert();

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(currentUser) {
				$rootScope.logged = true;
				$rootScope.user = currentUser.get('fullname');
				$rootScope.login = currentUser.get('username');
				$modalInstance.close();
			},
			error: function(user, error) {
				if (error.code == 101) {
					$("#login-inputEmail").parent().toggleClass('has-error');
					$("#login-inputPass").parent().toggleClass('has-error');
					$('#loginError').show();
				} else {
					alert("Error: " + error.code + " " + error.message);
					$('#unknowError').show();
				}
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