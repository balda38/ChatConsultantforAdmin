'use strict';
define(function () {
    var directiveModule = angular.module('dialogPreviewDirective', []);

    directiveModule.directive('dialogPreviewDirective',  function (selectUserFac) {
        return {
            restrict: 'EACM',
            template:				
                "<ul id='list' class='dialogs'>"+
                "</ul>",       
            scope: {
                
            },
            controller: function ($scope, $attrs, $http, $compile) {
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                var list = document.getElementById("list"); 
                var colors = ["#ff0000", "#9fff00", "#f1e50f", "#8a81ff", "#ee95d9", "#7397D4", "#71a7a5", "#624545", "#e18022", "#A0A9B1", "#c8b34e", "#f3e0e0", "#AD9999", "#0dffe9", "#ffac00", "#00ff00"];                
                var loaded = false;
                var msgCounts = {
                    names: [],
                    counts: []
                };

                setInterval(function(){
                    $http.get('/Clients/GetClients', { params: { admin: "admin1" } }, config)
                        .then(function (response) {  
                            if(response.data.length != list.childNodes.length){
                                list.innerHTML = "";
                                
                                response.data.forEach(function (item, i, arr) {
                                    var id = item.id - 1;
                                    
                                    var li = document.createElement("li"); 
                                    if(loaded && (id == response.data.length)){
                                        li.setAttribute("class", "news-user-dialog-preview"); 
                                        var span =  document.createElement("span"); 
                                        span.setAttribute("class", "new-message-alert");  
                                        span.innerHTML = "Нов. сообщ.";
                                        span.id = "newMsg" + id;
                                        li.appendChild(span);
                                    }
                                    else{
                                        li.setAttribute("class", "user-dialog-preview");  
                                    }                                    
                                    li.setAttribute("ng-click", "selectUser('" + item.name + "', " + id + ")");
                                    li.id = "preview" + id;
                                    li.name = "dialogPreview";
                                    
                                    var div = document.createElement("div");
                                    div.setAttribute("class", "circle-user-avatar");           
                                    var clrId = Math.floor(Math.random() * colors.length);
                                    div.style.background = "linear-gradient(to bottom right, " + colors[clrId] + ", #e0d15d)"

                                    var div1 = document.createElement("div");
                                    div1.setAttribute("class", "online-status");  

                                    var span1 = document.createElement("span");       
                                    span1.setAttribute("class", "avatar-name");    
                                    span1.innerHTML = item.name.charAt(0); 
                                    div.appendChild(span1);
                                    
                                    var span2 = document.createElement("span");       
                                    span2.setAttribute("class", "dialog-user-name");
                                    span2.innerHTML = item.name;          
                                    
                                    var span3 = document.createElement("span");       
                                    span3.setAttribute("class", "dialog-date");
                                    span3.id = "date" + id;
                                    span3.innerHTML = "Последнее сообщение: <br> " + toJavaScriptDateFromFactory(item.last_message); 
                                    
                                    li.appendChild(div);                                        
                                    li.appendChild(span2);  
                                    li.appendChild(span3); 
                                    li.appendChild(div1); 
                                    
                                    $compile(li)($scope);

                                    list.appendChild(li);  

                                    $http.get('/Messages/GetMsgCount', { params: { client: item.name } }, config)
                                        .then(function (response) {
                                            msgCounts.names[i] = item.name;
                                            msgCounts.counts[i] = response.data;
                                        }, function (error) {
                                            console.log("Ошибка: " + error)
                                        });
                                    
                                });  
                                loaded = true;  
                                list.childNodes[0].children[3].style.background = "#00ff15";                                 
                            }
                            else{
                                response.data.forEach(function (item, i, arr) {
                                    var id = item.id - 1;

                                    var li = document.getElementById("preview" + id);

                                    $http.get('/Messages/GetMsgCount', { params: { client: item.name } }, config)
                                        .then(function (response) {
                                            if(response.data != msgCounts.counts[msgCounts.names.indexOf(item.name)]){                                                
                                                li.setAttribute("class", "news-user-dialog-preview");
                                                
                                                msgCounts.counts[msgCounts.names.indexOf(item.name)]++;
                                                selectUserFac.setStat("clnt");
                                                selectUserFac.setUser(item.name);
                                                selectUserFac.setLastMessage(item.last_message);

                                                var span =  document.createElement("span"); 
                                                span.setAttribute("class", "new-message-alert");  
                                                span.innerHTML = "Нов. сообщ.";
                                                span.id = "newMsg" + id;
                                                li.appendChild(span);
                                            }
                                        }, function (error) {
                                            console.log("Ошибка: " + error)
                                        });  
                                });
                            }             
                    }, function (error) {
                        console.log("Ошибка: " + error)
                    });      
                }, 1000);
                
                function toJavaScriptDateFromServer(value) { 
                    var dataComponents = value.split(/\.| |:/); 
                    var dt = new Date(dataComponents[2], dataComponents[1], dataComponents[0], dataComponents[3], dataComponents[4], dataComponents[5]);
                    var d = new Date();
                    dt.setMinutes(dt.getMinutes() - d.getTimezoneOffset());
  
                    return addZeros(dt.getHours()) + ":" + addZeros(dt.getMinutes()) + ":" + addZeros(dt.getSeconds()) + " " + addZeros(dt.getDate()) + "." + addZeros(dt.getMonth()) + "." + dt.getFullYear();
                }

                function toJavaScriptDateFromFactory(value) {
                    var regexp = /Date\(([^)]+)\)/;

                    var results = regexp.exec(value);
                    var dt = new Date(parseFloat(results[1]));   
                    // var d = new Date();
                    // dt.setMinutes(dt.getMinutes() - d.getTimezoneOffset());             

                    return addZeros(dt.getHours()) + ":" + addZeros(dt.getMinutes()) + ":" + addZeros(dt.getSeconds()) + " " + addZeros(dt.getDate()) + "." + addZeros((dt.getMonth() + 1)) + "." + dt.getFullYear();
                }

                function addZeros(dateComponent) {
                    if (dateComponent < 10) return '0' + dateComponent;
                    else return dateComponent;
                }        

                $scope.selectUser = function(userName, nID){                 
                    selectUserFac.setUser(userName);
                    selectUserFac.setStat("adm");
                    
                    for(var i = 0; i < list.childNodes.length; i++){
                        if(list.childNodes[i].className != "news-user-dialog-preview"){
                            list.childNodes[i].setAttribute("class", "user-dialog-preview");    
                        }
                    }
                    
                    document.getElementById("preview" + nID).setAttribute("class", "user-dialog-preview-selected");
                    if(document.getElementById("newMsg" + nID)){
                        document.getElementById("newMsg" + nID).remove(); 
                    }                                        
                }

                $scope.$on('msgDateEvent', function () {             
                   $http.get('/Clients/GetClientID', { params: { name: selectUserFac.user, admin: "admin1" } }, config)                   
                        .then(function (response) {
                            var splt = document.getElementById("date" + response.data).innerHTML.split(" ");
                            var nDate = splt[3] + " " + splt[4];
                            if(nDate !== toJavaScriptDateFromFactory(selectUserFac.lastDate)){      
                                                     
                                var li = document.getElementById("preview" + response.data);

                                if (li.className != "user-dialog-preview-selected"){
                                    li.setAttribute("class", "news-user-dialog-preview");  
                                }

                                li.children[2].innerHTML = "Последнее сообщение: <br> " + toJavaScriptDateFromFactory(selectUserFac.lastDate);
                                $compile(li)($scope);
                                if(response.data != 0){
                                    list.insertBefore(li, list.childNodes[0]);         
                                }                                                          
                            }
                        }, function (error) {
                            console.log("Ошибка: " + error)
                        });                            
                })  
            },
            link: function (scope, element, attrs) {
                
            }
        }
    });
});
