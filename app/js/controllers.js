'use strict';

define(['angular', 'services', 'jquery', 'countdown', 'uibootstrap'], function(angular) {

	var app = angular.module('myApp.controllers', ['myApp.services', 'ui.bootstrap']);

	app.controller('LandingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
		var currentUser = Parse.User.current();
		$scope.logged = currentUser ? true : false;

		new Countdown({
			selector: '#countdown',
			msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
			dateEnd: new Date('Aug 15, 2015 20:00')
		});
	}]);

	app.controller('GuestCtrl', ['$scope', function($scope) {

		var currentUser = Parse.User.current();
		$scope.logged = currentUser ? true : false;
		if ($scope.logged) {
			$scope.user = currentUser.get('fullname');
		}

		$scope.groups = [{
			title: 'Dynamic Group Header - 1',
			content: 'Dynamic Group Body - 1'
		},{
			title: 'Dynamic Group Header - 2',
			content: 'Dynamic Group Body - 2'
		}];
	}]);

	app.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

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
				$location.path('/guest');
			});
		};

		$scope.logoff = function() {
			Parse.User.logOut();
			$location.path('/');
		};
	}]);

	app.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

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
			newUser.set('email', $scope.email);
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

	return app;
});
