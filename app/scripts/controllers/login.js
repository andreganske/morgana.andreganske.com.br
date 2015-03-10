'use strict';

angular.module('myApp')

.controller('LoginController', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

	 $scope.init = function() {
		$scope.user = $rootScope.user;
		$scope.logged = $rootScope.logged;
		$scope.allowLogin = true;
		$scope.allowSingin = false;

		var currentUser = Parse.User.current();
		if (currentUser != undefined) {
			$scope.logged = true;
			$scope.user = currentUser.get('fullname');
			$location.path("guest");
		}
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'LoginModalController',
			size: size
		});

		modalInstance.result.then(function () {
			if ($rootScope.logged) {
				$location.path('/guest');
			}
		});
	};

	$scope.logoff = function() {
		Parse.User.logOut();
		$location.path('/');
	};
}])

.controller('LoginModalController', function($rootScope, $scope, $modalInstance) {

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(retorno) {
				$rootScope.logged = true;
				$modalInstance.close();
			},
			error: function(user, error) {
				if (error.code == 101) {
					//app.showAlert(1);
				} else {
					//$('#error-undefined').alert();
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
				//$scope.alerts.push({type: 'danger', msg: "Error: " + error.code + " " + error.message});
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
});