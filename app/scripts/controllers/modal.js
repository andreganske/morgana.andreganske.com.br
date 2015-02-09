'use strict';

angular.module('myApp')

.controller('ModalController', ['$location', function($scope, $modalInstance, $location) {

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(retorno) {
				$location.path('/guest');
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
				$location.path('/guest');
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
	
}]);