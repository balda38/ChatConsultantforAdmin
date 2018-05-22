'use strict';
define(function () {
    var directiveModule = angular.module('settingsDirective', []);

    directiveModule.directive('settingsDirective', function () {
        return {
            restrict: 'EACM',
            template:
            "<br><br>" +
            "<div class='settings-section'>" +
                "<span style='font-size: 20px;'>Персональная информация</span>" +
                "<div class='split-line'></div>" +
                "<div class='settings-hint'>Это та информация, которая видна всем. В первую очередь она необходима посетителям сайта, на котором Вы работаете для того, чтобы они знали с кем общаются.</div>" +
                "<br>" +
                "<input class='settings-input' placeholder='Имя' id='adminName'>" +
                "<br><br>" +
                "<input class='settings-input' placeholder='Должность' id='post'>" +
                "<br><br>" +
            "</div>" +
            "<br>" +
            "<div class='settings-section'>" +
                "<span style='font-size: 20px;'>Данные аккаунта</span>" +
                "<div class='split-line'></div>" +
                "<div class='settings-hint'>Это та информация, которая видна только Вам. Она нигде не отображается и необходима только для входа на сайт, рассылки и некоторых других функций.</div>" +
                "<br>" +
                "<input class='settings-input' placeholder='Пароль' id='password' type='password'>" +
                "<br><br>" +
                "<input class='settings-input' placeholder='Эл. почта' id='email'>" +          
                "<br><br>" +
                "<input class='settings-input' placeholder='Рабочий сайт' id='site'>" +
                "<br><br>" +
                "<button class='popup-button' type='submit' ng-click='saveChanges()'/>Изменить" +
            "</div>",    
            scope: {},
            controller: function ($scope, $attrs, $http) {
                var adminLogin = sessionStorage.getItem("adminLogin");

                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }               

                $http.get('/Admins/SettingsList', { params: { login: adminLogin } }, config)
                    .then(function (response) {
                        document.getElementById("adminName").value = response.data[0].name; 
                        document.getElementById("post").value = response.data[0].post; 
                        document.getElementById("password").value = response.data[0].password; 
                        document.getElementById("email").value = response.data[0].email;   
                        document.getElementById("site").value = response.data[0].site;                                       
                    }, function (error) {
                        console.log("Ошибка: " + error);
                    });  
                    
                $scope.saveChanges = function(){
                    var settings = {
                        login: adminLogin,
                        name: document.getElementById("adminName").value,
                        post: document.getElementById("post").value,
                        password: document.getElementById("password").value,
                        email: document.getElementById("email").value,
                        site: document.getElementById("site").value
                    }

                    $http.post('/Admins/EditAdmin', { settings: settings }, config)
                        .then(function () {
                            window.location.href = '/Admins/Edit';
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
