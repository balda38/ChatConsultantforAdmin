'use strict';
define(function () {
    var directiveModule = angular.module('dialogPreviewDirective', []);

    directiveModule.directive('dialogPreviewDirective',  function (selectUserFac) {
        var uID = 0;
        return {
            restrict: 'EACM',
            template:				
                "<div class='user-dialog-preview' id='preview' name='dialogPreview' ng-click='selectUser()'>" +
                    "<div class='circle-user-avatar' id='avatarCircle'><span class='avatar-name'>{{userNameFirstLetter}}</span></div>" +
                    "<span class='dialog-user-name'>{{userName}}</span>" +
                    "<span class='dialog-date'>Последнее сообщение: <br> {{zoneDT}}</span>" +
                "</div>",        
            scope: {
                userName: '@',
				lastMsgDT: '@'
            },
            controller: function ($scope, $attrs) {
                $scope.userNameFirstLetter = $scope.userName.charAt(0);

                $scope.zoneDT = toJavaScriptDate($scope.lastMsgDT);

                function toJavaScriptDate(value) { 
                    var dataComponents = value.split(/\.| |:/); 
                    var dt = new Date(dataComponents[2], dataComponents[1], dataComponents[0], dataComponents[3], dataComponents[4], dataComponents[5]);
                    var d = new Date();
                    dt.setMinutes(dt.getMinutes() - d.getTimezoneOffset());
  
                    return addZeros(dt.getHours()) + ":" + addZeros(dt.getMinutes()) + ":" + addZeros(dt.getSeconds()) + " " + addZeros(dt.getDate()) + "." + addZeros((dt.getMonth() + 1)) + "." + dt.getFullYear();
                }

                function addZeros(dateComponent) {
                    if (dateComponent < 10) return '0' + dateComponent;
                    else return dateComponent;
                }

                $scope.$on('msgDateEvent', function () {
                    if($scope.userName == selectUserFac.user){
                        $scope.lastMsgDT = toJavaScriptDate(selectUserFac.lastDate);
                    };                                 
                })  

                $scope.selectUser = function(){                    
                    selectUserFac.setUser($scope.userName);

                    var previews = document.getElementsByName("dialogPreview");
                    previews.forEach(function (item, i, arr) {
                        item.style.background = "#FFFFFF";                                
                    });
                    document.getElementById("preview" + ($scope.$id -1)).style.background = "#DCDCDC";
                }
            },
            link: function (scope, element, attrs) {
                uID += 1;
                document.getElementById("avatarCircle").id = "avatarCircle" + uID;
                document.getElementById("preview").id = "preview" + uID;

                var colors = ["#ff0000", "#9fff00", "#f1e50f", "#8a81ff", "#ee95d9", "#7397D4", "#71a7a5", "#624545", "#e18022", "#A0A9B1", "#c8b34e", "#f3e0e0", "#AD9999", "#0dffe9", "#ffac00", "#00ff00"];
                var avatarCircle = document.getElementById("avatarCircle" + uID);             
                var clrId = Math.floor(Math.random() * colors.length);
                avatarCircle.style.backgroundColor = colors[clrId];
            }
        }
    });
});
