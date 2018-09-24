
require.config({
    paths: {
        jquery: 'libs/jquery-3.3.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        tpl: 'libs/tpl',
        
        "MenuView": "views/MenuView",
        "CountrySearchView": "views/countrySearchView",

        "CountryModel": "models/countryModel",
        "CountriesCollection": "collections/countriesCollection",
                
        "MapModel": "models/mapModel",
        "CountryView": "views/countryView",
        "CountriesView": "views/countriesView",
        
    }
});

define(['app'], function(App) { 
    App.initialize() ;
});