'use strict';
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
                        "<input type='text' id='login' placeholder='Логин' ng-keydown='usrEnter($event)'>"+
                        "<br><br>"+
                        "<input type='password' id='password' placeholder='Пароль' ng-keydown='usrEnter($event)'>"+
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
                                <input type='text' id='email' placeholder='Эл. почта'>\n\
                                <br><br>\n\
                                <input type='text' id='name' placeholder='Имя'>\n\
                                <br><br>\n\
                                <input type='text' id='site' placeholder='Сайт'>\n\
                                <br><br>\n\
                                <input type='text' id='post' placeholder='Должность'>\n\
                                <br><br>\n\
                                <button class='popup-button' ng-click='switchPopup(2)'>Назад</button>\n\
                                <button class='popup-button' ng-click='userRegistration()'>Регистрация</button>";
                                content.style.marginTop = "14%";
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
                    if ((document.getElementById('login').value != "") && (document.getElementById('password').value != "")){    
                        $http.get('/Admins/AdminEnter', { params: { login: document.getElementById('login').value, password: document.getElementById('password').value } }, config)
                            .then(function (response) {
                                if (response.data == 'Успешный вход'){
                                    $http.post('/Clients/ChangeStatus', { login: document.getElementById('login').value, status: true }, config)
                                        .then(function () {
                                            window.location.href = '/Clients/Index';
                                        }, function (error) {
                                            console.log("Ошибка: " + error);
                                        });                                    
                                }
                                else{
                                    window.alert(response.data);
                                }                        
                            }, function (error) {
                                console.log("Ошибка: " + error);
                            });                
                    }   
                    else{
                        window.alert("Введите, пожалуйста, Ваши данные");
                    }  
                }; 

                $scope.usrEnter = function(e) {
                    if (e.keyCode == 13) {
                        if ((document.getElementById('login').value != "") && (document.getElementById('password').value != "")){
                            $scope.userEnter();
                        }
                        else{
                            window.alert("Введите, пожалуйста, Ваши данные");
                        }
                    }                    
                };                

                $scope.userRegistration = function() {
                    var newAdmin = {
                        login: document.getElementById('login').value,
                        password: document.getElementById('password').value,
                        name: document.getElementById('name').value,
                        post: document.getElementById('post').value,
                        email: document.getElementById('email').value,
                        site: document.getElementById('site').value
                    }
                    
                    $http.post('/Admins/NewAdmin', { admin: newAdmin }, config)
                        .then(function (response) {
                            if(response.data == "Учетная запись администратора с таким именем уже существует"){
                                window.alert(response.data);                                
                            }
                            else{
                                window.alert(response.data);
                                $scope.switchPopup(2);
                            }
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
