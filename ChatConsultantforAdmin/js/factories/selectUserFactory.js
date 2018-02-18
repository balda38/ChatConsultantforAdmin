'use strict';
define(function(){
	var factoryModule = angular.module('selectUserFactory', []);
	
	factoryModule.factory('selectUserFac', function($rootScope){		
		var messageTo = {};
		
		messageTo.user = '';

		messageTo.setUser = function (msgTo){
			this.user = msgTo;
			this.broadcasting();
		};

		messageTo.broadcasting = function (){
			$rootScope.$broadcast('msgToEvent');
		};

		return messageTo;
	});
});