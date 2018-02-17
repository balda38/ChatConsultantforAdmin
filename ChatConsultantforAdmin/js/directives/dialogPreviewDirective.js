'use strict';
define(function () {
    var directiveModule = angular.module('dialogPreviewDirective', []);

    directiveModule.directive('dialogPreviewDirective', function () {
        var uID = 0;
        return {
            restrict: 'EACM',
            template:				
                "<div class='user-dialog-preview'>" +
                    "<div class='circle-user-avatar' id='avatarCircle'><span class='avatar-name'>{{userNameFirstLetter}}</span></div> " +
                    "<span class='dialog-user-name'>{{userName}}</span>" +
                    "<span class='dialog-date'>Последнее сообщение: <br> {{lastMsgDT}}</span>" +
                "</div>",        
            scope: {
                userName: '@',
				lastMsgDT: '@'
            },
            controller: function ($scope, $attrs) {
                $scope.userNameFirstLetter = $scope.userName.charAt(0);
            },
            link: function (scope, element, attrs) {
                uID += 1;
                document.getElementById("avatarCircle").id = uID;

                var colors = ["#ff0000", "#9fff00", "#f1e50f", "#8a81ff", "#ee95d9", "#7397D4", "#71a7a5", "#624545", "#e18022", "#A0A9B1", "#c8b34e", "#f3e0e0", "#AD9999", "#0dffe9", "#ffac00", "#00ff00"];
                var avatarCircle = document.getElementById(uID);             
                var clrId = Math.floor(Math.random() * colors.length);
                avatarCircle.style.backgroundColor = colors[clrId];
            }
        }
    });
});
