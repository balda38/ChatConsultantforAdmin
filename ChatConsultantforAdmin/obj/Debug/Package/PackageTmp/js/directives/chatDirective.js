'use strict';
define(function () {
    var directiveModule = angular.module('chatDirective', []);
    
    directiveModule.directive('chatDirective', function (selectUserFac) {
        return {
            restrict: 'EACM',
            template:
                "<div class='dialog-header' id='dialogHeader'>{{dialogHeader}}</div>"+
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
                    $scope.dialogHeader = selectUserFac.user;

                    setInterval(function(){
                        $http.get('/Messages/SetClient', { params: { client: data.msgTo } }, config)
                        .then(function (response) {    
                            if(response.data.length != 0){  
                                if(response.data[response.data.length - 1].msgText != lastMessage){  
                                    ul.innerHTML = "";
                                    
                                    response.data.forEach(function (item, i, arr) {
                                        updateList(item.msgText, item.date, item.msgFrom);                                
                                    });
                                    
                                    selectUserFac.setLastMessage(response.data[response.data.length - 1].date);
                                }     
                            }   
                            else ul.innerHTML = "";

                            if (document.getElementById('userMessage').style.opacity == 0){
                                document.getElementById('hint').remove();
                            }                            
                            document.getElementById('userMessage').style.opacity = 1;
                            document.getElementById('dialogHeader').style.opacity = 1;
                        }, function (error) {
                            errorFn();
                        });      
                    }, 5000);
                                  
                })                  
                
                $scope.sendMessage = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        if (msg.value != "") {   
                            data.msgText = msg.value;   
                            var d = new Date();                          
                            $http.post('/Messages/AddMessage', { newMsg: data, role: "admin" }, config)
                                .then(function (response) {
                                    successPostMessageFn(response.data);
                                    selectUserFac.setLastMessage(response.data.date);
                                }, function (error) {
                                    errorFn(error);
                                });
                        };                        
                    };
                };

                var lastMessage = undefined;

                function updateList(text, date, msgFrom) {
                    var li = document.createElement('li');
                    var br = document.createElement('br');
                    var span = document.createElement('span');
                    if(msgFrom == data.msgFrom) li.setAttribute('class', 'admin-message-cloud');                    
                    else li.setAttribute('class', 'user-message-cloud');    
                    lastMessage = text;                
                    br.setAttribute('style', 'clear: both');
                    li.appendChild(document.createTextNode(text));
                    ul.appendChild(li);
                    ul.appendChild(br);
                    span.innerHTML = toJavaScriptDate(date);
                    span.setAttribute('style', 'clear: both');
                    if(msgFrom == data.msgFrom) span.setAttribute('class', 'admin-message-date');
                    else span.setAttribute('class', 'user-message-date');
                    ul.appendChild(span);
                    ul.appendChild(br);

                    scrollToDown();
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

                function successPostMessageFn(data) {                   
                    updateList(msg.value, data.date, data.msgFrom);
                    msg.value = "";

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
