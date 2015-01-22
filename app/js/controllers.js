'use strict';

define(['angular', 'services', 'jquery', 'countdown', 'uibootstrap'], function(angular) {

	var app = angular.module('myApp.controllers', ['myApp.services', 'ui.bootstrap']);

	app.controller('LandingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
		new Countdown({
			selector: '#countdown',
			msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
			dateEnd: new Date('Aug 15, 2015 20:00')
		});
	}]);

	app.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modal', '$log', function($rootScope, $scope, $modal, $log) {

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
				$scope.user = currentUser.get('name');
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$scope.logoff = function() {
			Parse.User.logOut();
			var currentUser = Parse.User.current();
			$scope.logged = currentUser ? true : false;
		};
	}]);

	app.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

		$scope.login = function () {

			Parse.User.logIn($scope.email, $scope.password, {
				success: function(retorno) {
					//$rootScope.user = retorno;
					//$mdDialog.hide();
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
			newUser.set('name', $scope.fullname);
			newUser.set('email', $scope.email);
			newUser.set('password',	$scope.password);

			newUser.signUp (null, {
				success: function(user) {
					//$scope.alerts.push({type: 'success', msg: "Bem vindo " + user.get("name")});
					alert("Sucesso!");
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
