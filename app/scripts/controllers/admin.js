'use strict';

angular.module('myApp')

.controller('AdminController', ['$rootScope', '$scope', 'ParseSDK', '$modal', function($rootScope, $scope, ParseService, $modal) {

	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	$scope.updateList = function() {
		var promise = ParseService.getProducts();

		promise.done(function() {
			for (var i = $rootScope.products.length - 1; i >= 0; i--) {
				var product = {name: '', description: '', category: '', available: '', id: ''},
					obj = $rootScope.products[i];
				
				product.name = obj.get('name');
				product.description = obj.get('description');
				product.category = obj.get('category');
				product.available = obj.get('available');
				product.id = obj.id;
				
				$scope.products.push(product);
			};
		});
	}

}]);
