'use strict';
define(function () {
    var directiveModule = angular.module('chatDirective', []);
    
    directiveModule.directive('chatDirective', function (selectUserFac) {
        return {
            restrict: 'EACM',
            template:
                "<div id='chat2' class='chat-with-user'>" +
                    "<span id='hint' class='chat-hint'>Пожалуйста, выберите диалог слева</span>" + 
					"<ul id='messages' class='clear'>" +
					"</ul>" +
                "</div>" +
                "<textarea ng-keydown='sendMessage($event)' id='userMessage' type='text' class='chat-input' placeholder='Введите ваше сообщение здесь и нажмите Enter...' ></textarea>",           
            scope: {},
            controller: function ($scope, $attrs, $http) {
                var msg = document.getElementById('userMessage');
                var ul = document.getElementById('messages');
                var chatWindow = document.getElementById('chat2');
                $scope.userName = undefined;               
                
                var messageFrom = "admin1";
                var messageTo = undefined;
                                
                //sessionStorage.getItem('admin'),
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                var data = {
                    msgText: undefined,
                    msgFrom: "admin1",
                    msgTo: undefined
                }

                $scope.$on('msgToEvent', function () {
                    data.msgTo = selectUserFac.user;

                    $http.get('/Messages/SetClient', { params: { client: data.msgTo } }, config)
                        .then(function (response) {
                            ul.innerHTML = "";

                            response.data.forEach(function (item, i, arr) {
                                updateList(item.msgText, item.date);                                
                            });
                            scrollToDown();
                            
                            if (document.getElementById('userMessage').style.opacity == 0){
                                document.getElementById('hint').remove();
                            }                            
                            document.getElementById('userMessage').style.opacity = 1;
                        }, function (error) {
                            errorFn();
                        });                    
                })                  
                
                $scope.sendMessage = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        if (msg.value != "") {   
                            data.msgText = msg.value;   
                            var d = new Date();                          
                            $http.post('/Messages/AddMessage', { newMsg: data }, config)
                                .then(function (response) {
                                    successPostMessageFn(response.data);
                                }, function (error) {
                                    errorFn(error);
                                });
                        };                        
                    };
                };

                function updateList(text, date) {
                    var li = document.createElement('li');
                    var br = document.createElement('br');
                    var span = document.createElement('span');
                    li.setAttribute('class', 'admin-message-cloud');
                    br.setAttribute('style', 'clear: both');
                    li.appendChild(document.createTextNode(text));
                    ul.appendChild(li);
                    ul.appendChild(br);
                    span.innerHTML = toJavaScriptDate(date);
                    span.setAttribute('style', 'clear: both');
                    span.setAttribute('class', 'message-date');
                    ul.appendChild(span);
                    ul.appendChild(br);
                }

                function toJavaScriptDate(value) {
                    var dt = undefined;
                    var regexp = /Date\(([^)]+)\)/;

                    if (typeof value == "string") {
                        var results = regexp.exec(value);
                        dt = new Date(parseFloat(results[1]));
                    }
                    else {
                        dt = value;
                    }

                    return addZeros(dt.getHours()) + ":" + addZeros(dt.getMinutes()) + ":" + addZeros(dt.getSeconds()) + " " + addZeros(dt.getDate()) + "." + addZeros((dt.getMonth() + 1)) + "." + dt.getFullYear();
                }

                function addZeros(dateComponent) {
                    if (dateComponent < 10) return '0' + dateComponent;
                    else return dateComponent;
                }

                function successPostMessageFn(date) {                   
                    updateList(msg.value, date);
                    msg.value = "";

                    scrollToDown();

                    console.log("success");
                };

                function errorFn(error) {
                    console.log("error: " + error);
                };

                function scrollToDown() {
                    if (chatWindow.scrollHeight != 0) {
                        chatWindow.scrollTo(0, chatWindow.scrollHeight);
                    };
                };
            },
            link: function (scope, element, attrs) {
            }
        }
    });
});
