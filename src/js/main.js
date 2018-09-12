
require.config({
    paths: {
        jquery: 'libs/jquery-3.3.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        tpl: 'libs/tpl',
    }
});

define(['app'], function(App) { 
    App.initialize() ;
});