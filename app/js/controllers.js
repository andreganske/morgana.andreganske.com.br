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

			modalInstance.result.then(function (selectedItem) {
				$log.info('ook');
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$scope.logoff = function() {

		};
	}]);

	app.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

		$scope.login = function () {
			$modalInstance.close();
		};

		$scope.create = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	});

	return app;
});
