'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', 'ParseSDK', function($rootScope, $scope, ParseService) {
	
	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	var promise = ParseService.getProducts();

	promise.done(function() {
		for (var i = $rootScope.products.length - 1; i >= 0; i--) {
			var product = {name: '', description: '', category: '', available: ''},
				obj = $rootScope.products[i];
			
			product.name = obj.get('name');
			product.description = obj.get('description');
			product.category = obj.get('category');
			product.available = obj.get('available');
			
			$scope.products.push(product);
		};
	});
}]);