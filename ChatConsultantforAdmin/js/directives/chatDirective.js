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

                var data = {
                    msgText: undefined,
                    msgFrom: sessionStorage.getItem('admin'),
                    msgTo: undefined
                }               

                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

                            document.getElementById('userMessage').style.opacity = 1;
                            document.getElementById('hint').remove();
                        }, function (error) {
                            errorFn();
                        });                    
                })                  
                
                $scope.sendMessage = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        if (msg.value != "") {  
                            data.msgText = msg.value;                            
                            console.log(data.msgTo);
                            $http.post('/Messages/AddMessage', { messageText: data.msgText, messageFrom: data.msgFrom, messageTo: data.msgTo }, config)
                                .then(function (response) {
                                    selectUserFac.setLastMessage(toJavaScriptDate(response.data));

                                    successPostMessageFn();
                                }, function (error) {
                                    errorFn();
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

                function successPostMessageFn() {                    
                    updateList(msg.value, new Date());
                    msg.value = "";

                    scrollToDown();

                    console.log("success");
                };

                function errorFn() {
                    console.log("error");
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
