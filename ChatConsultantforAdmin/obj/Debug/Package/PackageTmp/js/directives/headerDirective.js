'use strict';
define(function () {
    var directiveModule = angular.module('headerDirective', []);

    directiveModule.directive('headerDirective', function () {
        return {
            restrict: 'EACM',
            template:
                "<p class='header-title' ng-click='returnToDialogs()'>ChatConsultant</p>"+
                "<div class='admin-full-name'>{{adminName}}</div>"+
                "<div ng-click='openCloseMenu()' class='circle-admin-avatar'><span class='admin-name'>A</span></div>"+
                "<div class='admin-status'>В сети"+
                    "<div class='status-slider' ng-click='changeAdminStatus()'>"+
                        "<div id='sliderButton' class='slider-button'></div>"+
                        "<div id='sliderBG' class='slider-background'></div>"+
                    "</div>"+
                "</div>"+
                "<ul id='contextMenu' class='admin-menu'>"+
                    "<li ng-click='goToSettings()'>Настройки"+
                    "<li ng-click='userExit()'>Выход"+
                "</ul>",
            scope: {},
            controller: function ($scope, $attrs, $http, $rootScope) {
                var opacity = false;
                var status = true;

                $scope.adminName = sessionStorage.getItem("adminName");
                var adminLogin = sessionStorage.getItem("adminLogin");

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

                $scope.returnToDialogs = function(){
                    window.location.href = '/Clients/Index';
                };

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
                        btn.setAttribute("style", "left: 30px");
                        bg.style.backgroundColor = "#ff0000";
                        status = false;
                        sendQuery();
                    }
                    else{
                        btn.setAttribute("style", "left: 7px");
                        bg.style.backgroundColor = "#00ff00";
                        status = true;
                        sendQuery();
                    }
                }

                var sendQuery = function(){
                    $http.post('/Admins/ChangeStatus', { login: sessionStorage.getItem("adminLogin"), status: status }, config)
                        .then(function (response) {
                            if(response.data == "Данная учетная запись уже авторизована"){
                                window.alert(response.data);
                                window.location.href = "/Admins/Index";
                            }
                        }, function (error) {
                            console.log("Ошибка: " + error);
                        }); 
                }

                $http.post('/Admins/ChangeStatus', { login: adminLogin, status: true }, config)
                        .then(function (response) {
                            
                        }, function (error) {
                            console.log("Ошибка: " + error);
                        }); 

                window.onbeforeunload = function(e){
                    $http.post('/Admins/ChangeStatus', { login: adminLogin, status: false }, config)
                        .then(function (response) {
                            
                        }, function (error) {
                            console.log("Ошибка: " + error);
                        }); 
                
                    $rootScope.$digest();                    
                }
            },
            link: function (scope, element, attrs) {
            }
        }
    });
});
