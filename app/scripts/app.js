'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'angular-loading-bar']);

myApp.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'app/scripts/views/home.html'
	});

	$routeProvider.when('/contact', {
		templateUrl : 'app/scripts/views/contact.html'
	});

	$routeProvider.otherwise({redirectTo: '/'});

});

myApp.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

	 $scope.init = function() {
		$scope.allowLogin = $rootScope.allowLogin;
		$scope.allowSingin = $rootScope.allowSingin;

		var currentUser = Parse.User.current();
		$scope.logged = currentUser ? true : false;
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'ModalInstanceCtrl',
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

myApp.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(retorno) {
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