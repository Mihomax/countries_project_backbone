
define([
    'jquery',
    'underscore',
    'backbone',
    'views/menuView',
    'views/countrySearchView',
    'views/countriesView',
    "collections/countriesCollection",
    ],

function($,_,Backbone, MenuView, CountrySearchView, CountriesView, CountriesCollection){
    var initialize = function(){
        Backbone.history.start();
        var menuView = new MenuView({router:router});
        menuView.render();
        }

        var AppRouter = Backbone.Router.extend({
            routes: {
                "home":"viewHome",
                "favorites":"viewFavorites",
                "*other": "viewHome"
            },

        viewHome: function() {

            $("#country-list").empty();
            var countrySearchView = new CountrySearchView({});
            countrySearchView.render();
        },
            
        viewFavorites: function() {
            $('#searchDiv').empty();
            var currStorage = localStorage.getItem("userLocalStorage");
                if (!currStorage || currStorage.length <= 2 ) {
                    $('#country-list').html("Your favorites are empty...");
                }
                else {
                    currStorage = JSON.parse(currStorage);
                    var countries = new CountriesCollection (currStorage);
                    var countriesView = new CountriesView({el:"#country-list",collection:countries});
                    countriesView.render();
                }
        }
        });

        var router = new AppRouter();
        
        return {
            initialize:initialize
        };
});



















