'use strict';
define(function(){
	var factoryModule = angular.module('selectUserFactory', []);
	
	factoryModule.factory('selectUserFac', function($rootScope){		
		var messageTo = {};

		messageTo.user = '';
		messageTo.lastDate = '';
		messageTo.stat = '';

		messageTo.setUser = function (msgTo){
			this.user = msgTo;
			this.broadcastingTo();
		};

		messageTo.broadcastingTo = function (){
			$rootScope.$broadcast('msgToEvent');
		};

		messageTo.setLastMessage = function (date){			
			this.lastDate = date;
			this.broadcastingDate();
		};

		messageTo.broadcastingDate = function (){
			$rootScope.$broadcast('msgDateEvent');
		};

		messageTo.setStat = function (stat){
			this.stat = stat;
		};

		return messageTo;
	});
});