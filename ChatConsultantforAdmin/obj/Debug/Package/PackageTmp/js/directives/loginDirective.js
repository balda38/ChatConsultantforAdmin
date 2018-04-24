﻿'use strict';
define(function () {
    var directiveModule = angular.module('loginDirective', []);

    directiveModule.directive('loginDirective', function (selectUserFac) {
        return {
            restrict: 'EACM',
            template:
            "<div id='popup' class='hide-popup'>"+
                "<div class='popup'>"+
                    "<div id='content' class='popup-content'>"+
                        "Авторизуйтесь в качестве администратора"+
                        "ChatConsultant"+
                        "<br><br>"+
                        "<input type='text' id='login' placeholder='Логин'>"+
                        "<br><br>"+
                        "<input type='password' id='password' placeholder='Пароль'>"+
                        "<br><br>"+
                        "<button class='popup-button' ng-click='userEnter()'>Вход</button>"+
                        "<button class='popup-button' ng-click='switchPopup(1)'>Регистрация</button>"+
                        "</div>"+
                    "</div>"+
                "</div>",
            scope: {},
            controller: function ($scope, $attrs, $http, $compile) {
                var popup = document.getElementById("popup");
                var content = document.getElementById("content"); 

                var uprisePopup = function () {
                    window.setTimeout(function () {
                        popup.setAttribute("class", "hide-popup show-popup");
                    }, 800);
                };

                uprisePopup();
        
                $scope.switchPopup = function(popupNum) {
                    switch(popupNum){
                        case 1:
                            popup.setAttribute("class", "hide-popup");
                            window.setTimeout(function () {
                                var innerHtml = "Зарегистрируйтесь в качестве администратора\n\
                                ChatConsultant\n\
                                <br><br>\n\
                                <input type='text' id='login' placeholder='Логин'>\n\
                                <br><br>\n\
                                <input type='password' id='password' placeholder='Пароль'>\n\
                                <br><br>\n\
                                <button class='popup-button' ng-click='switchPopup(2)'>Назад</button>\n\
                                <button class='popup-button' ng-click='userRegistration()'>Регистрация</button>";
                                var element = angular.element(content);
                                var newContent = element.html(innerHtml);
                                $compile(newContent.contents())($scope);
                            }, 800);
                            uprisePopup();
                            break;
                        case 2:
                            popup.setAttribute("class", "hide-popup");
                            window.setTimeout(function () {
                                var innerHtml = "Авторизуйтесь в качестве администратора\n\
                                ChatConsultant\n\
                                <br><br>\n\
                                <input type='text' id='login' placeholder='Логин'>\n\
                                <br><br>\n\
                                <input type='password' id='password' placeholder='Пароль'>\n\
                                <br><br>\n\
                                <button class='popup-button' ng-click='userEnter()'>Вход</button>\n\
                                <button class='popup-button' ng-click='switchPopup(1)'>Регистрация</button>";
                                var element = angular.element(content);
                                var newContent = element.html(innerHtml);
                                $compile(newContent.contents())($scope);
                            }, 800);
                            uprisePopup();
                            break;
                    }
                };
                
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        
                $scope.userEnter = function() {               
                    $http.get('/Admins/AdminEnter', { params: { login: document.getElementById('login').value, password: document.getElementById('password').value } }, config)
                    .then(function (response) {
                        if (response.data == 'Успешный вход'){
                            window.location.href = '/Clients/Index';
                        }
                        else{
                            window.alert(response.data);
                        }                        
                    }, function (error) {
                        errorFn();
                    });                     
                }; 

                $scope.userRegistration = function() {
                    $http.post('/Admins/NewAdmin', { login: document.getElementById('login').value, password: document.getElementById('password').value }, config)
                        .then(function (response) {
                            if(response.data == "Учетная запись администратора с таким именем уже существует"){
                                window.alert(response.data);                                
                            }
                            else{
                                window.alert(response.data);
                                $scope.switchPopup(2);
                            }
                        }, function (error) {
                            errorFn();
                        });
                }

                function errorFn() {
                    console.log("error");
                };
            },
            link: function (scope, element, attrs) {
            }
        }
    });
});