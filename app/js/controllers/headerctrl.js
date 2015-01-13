define([], function() {

	return ['$scope', '$http', function($scope, %http) {


		// its an async, so we missed Angular's initial call
		// to $apply
		$scope.$apply();
	}];

});