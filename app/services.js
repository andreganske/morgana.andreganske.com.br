'use strict';

angular.module('myApp.services', []).constant('globalConstant', {
	name: 		'Morgana e Andre',
	version: 	'0.1'
}).value('globalConfig', {
	allowLogin: 	false,
	allowSigin: 	false,
	useAnalytics: 	false
});