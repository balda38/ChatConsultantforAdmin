'use strict';
define(function () {
    var directiveModule = angular.module('adminAvatarDirective', []);

    directiveModule.directive('adminAvatarDirective', function () {
        return {
            restrict: 'EACM',
            template:
                "<div class='admin-full-name'>{{adminName}}</div>"+
                "<div ng-click='openCloseMenu()' class='circle-admin-avatar'><span class='admin-name'>A</span></div>"+
                "<div class='admin-status'>В сети"+
                    "<div class='status-slider' ng-click='changeAdminStatus()'>"+
                        "<div id='sliderButton' class='slider-button-left'></div>"+
                        "<div id='sliderBG' class='slider-background'></div>"+
                    "</div>"+
                "</div>"+
                "<ul id='contextMenu' class='admin-menu'>"+
                    "<li ng-click='goToSettings()'>Настройки"+
                    "<li ng-click='userExit()'>Выход"+
                "</ul>",
            scope: {},
            controller: function ($scope, $attrs, $http) {
                var opacity = false;
                var status = true;

                $scope.adminName = sessionStorage.getItem("adminName");

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

                $scope.changeAdminStatus = function(){
                    var btn = document.getElementById("sliderButton");
                    var bg = document.getElementById("sliderBG");

                    if(status){
                        btn.setAttribute("class", "slider-button-right");
                        bg.style.backgroundColor = "#ff0000";
                        status = false;
                        sendQuery();
                    }
                    else{
                        btn.setAttribute("class", "slider-button-left");
                        bg.style.backgroundColor = "#00ff00";
                        status = true;
                        sendQuery();
                    }
                }

                var sendQuery = function(){
                    $http.post('/Admins/ChangeStatus', { login: sessionStorage.getItem("adminLogin"), status: status }, config)
                        .then(function (response) {
                            console.log("done");
                        }, function (error) {
                            console.log("Ошибка: " + error);
                        }); 
                }
            },
            link: function (scope, element, attrs) {
            }
        }
    });
});
