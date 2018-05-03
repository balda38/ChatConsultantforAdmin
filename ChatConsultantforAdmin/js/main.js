'use strict';
require.config({
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'app': 'chatConsultantForAdmin',
        'chatDirective': 'directives/chatDirective',
        'dialogPreviewDirective': 'directives/dialogPreviewDirective',
        'selectUserFactory': 'factories/selectUserFactory',
        'loginDirective': 'directives/loginDirective',
        'adminAvatarDirective': 'directives/adminAvatarDirective',
        'settingsDirective': 'directives/settingsDirective'
    },
	
    shim: {
        'app': {
            deps: ['angular', 'chatDirective', 'dialogPreviewDirective', 'selectUserFactory', 'loginDirective', 'adminAvatarDirective', 'settingsDirective']
        },
        'chatDirective': {
            deps: ['angular']
        },
        'dialogPreviewDirective': {
            deps: ['angular']
        },
        'selectUserFactory': {
            deps: ['angular']
        },
        'loginDirective': {
            deps: ['angular']
        },
        'adminAvatarDirective': {
            deps: ['angular']
        },
        'settingsDirective': {
            deps: ['angular']
        }
    }
});

require(['app'], function () {
    angular.bootstrap(document, ['chatConsultantForAdmin']);
});