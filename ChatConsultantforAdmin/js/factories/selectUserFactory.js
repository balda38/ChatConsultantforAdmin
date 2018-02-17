'use strict';
define(function(){
	var factoryModule = angular.module('selectUserFactory', []);
	
	factoryModule.factory('selectUserFac', function($injector){		
		
		return function(){
			return new function(){					
					
			};
		};
	});
});