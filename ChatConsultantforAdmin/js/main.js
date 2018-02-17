'use strict';
require.config({
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'app': 'chatConsultantForAdmin',
        'chatDirective': 'directives/chatDirective',
        'dialogPreviewDirective': 'directives/dialogPreviewDirective',
        'selectUserFactory': 'factories/selectUserFactory'
    },
	
    shim: {
        'app': {
            deps: ['angular', 'chatDirective', 'dialogPreviewDirective', 'selectUserFactory']
        },
        'chatDirective': {
            deps: ['angular']
        },
        'dialogPreviewDirective': {
            deps: ['angular']
        },
        'selectUserFactory': {
            deps: ['angular']
        }
    }
});

require(['app'], function () {
    angular.bootstrap(document, ['chatConsultantForAdmin']);
});