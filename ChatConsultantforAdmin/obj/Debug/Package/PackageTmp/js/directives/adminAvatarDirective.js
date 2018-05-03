'use strict';
define(function () {
    var directiveModule = angular.module('adminAvatarDirective', []);

    directiveModule.directive('adminAvatarDirective', function () {
        return {
            restrict: 'EACM',
            template:
                "<div ng-click='openCloseMenu()' class='circle-admin-avatar'><span class='admin-name'>A</span></div>"+
                "<ul id='contextMenu' class='admin-menu'>"+
                    "<li ng-click='goToSettings()'>Настройки"+
                    "<li ng-click='userExit()'>Выход"+
                "</ul>",
            scope: {},
            controller: function ($scope, $attrs, $http) {
                var opacity = false;

                $scope.openCloseMenu = function(){
                    var menu = document.getElementById("contextMenu");

                    if(opacity){
                        menu.style.opacity = 0;
                        menu.style.pointerEvents = "none";
                        opacity = false;
                    }
                    else{
                        menu.style.opacity = 1;
                        menu.style.pointerEvents = "auto";
                        opacity = true;
                    }
                };

                $scope.goToSettings = function(){
                    window.location.href = '/Admins/Edit';
                };

                var adminLogin = "topadmin";

                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }   

                $scope.userExit = function(){
                    $http.post('/Admins/ChangeStatus', { login: adminLogin, status: false }, config)
                        .then(function () {
                            window.location.href = '/Admins/Index';
                        }, function (error) {
                            console.log("Ошибка: " + error);
                        });                    
                };
            },
            link: function (scope, element, attrs) {
            }
        }
    });
});
