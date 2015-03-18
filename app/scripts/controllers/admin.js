'use strict';

angular.module('myApp')

.controller('AdminController', ['$rootScope', '$scope', 'ParseSDK', '$modal', '$location', function($rootScope, $scope, ParseService, $modal, $location) {

	$scope.templates =[
		{ name: 'gifts', url: 'app/scripts/views/gifts.html'},
		{ name: 'guest', url: 'app/scripts/views/guests.html'}
	];

	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	$scope.tab = 0;

	$scope.changeTab = function(newTab) {
		$scope.tab = newTab;
	};

	$scope.isActiveTab = function(tab) {
		return $scope.tab === tab;
	};

	$scope.updateList = function() {
		var promise = ParseService.getProducts();

		promise.done(function() {
			$scope.products = [];

			for (var i = $rootScope.products.length - 1; i >= 0; i--) {
				var product = {name: '', description: '', category: '', available: '', id: ''},
					obj = $rootScope.products[i];
				
				product.name = obj.get('name');
				product.description = obj.get('description');
				product.category = obj.get('category');
				product.available = obj.get('available');
				product.availableTxt = obj.get('available') ? 'Disponível' : 'Reservado';
				product.id = obj.id;
				
				$scope.products.push(product);
			};
		});
	};

	$scope.viewGifts = function() {
		$scope.pageheader = 'Nossos presentes';
		$scope.template = $scope.templates[0];
		$scope.updateList();
	};

	$scope.viewGuests = function() {
		$scope.pageheader = 'Nossos convidados';
		$scope.template = $scope.templates[1];
	};

	$scope.logoff = function() {
		ParseService.logout();
	};

	$scope.viewGifts();

}]);
