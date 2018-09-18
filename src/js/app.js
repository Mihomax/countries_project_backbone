
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

            //this guy is just a common object(property) for my CountrySearchView and CountriesView views, 
            // which takes and keeps user search value. I pass this 'bus' object when initializing each of them 
            
            var bus = _.extend({},Backbone.Events);
            var countrySearchView = new CountrySearchView({
                bus:bus
            });
            countrySearchView.render();

            // $("#country-list").empty();
            var countriesView = new CountriesView({
                el:"#country-list",  
                bus:bus 
            });
        },
            
        viewFavorites: function() {
            var currStorage = localStorage.getItem("userLocalStorage");
                if (!currStorage || currStorage.length <= 2 ) {
                    $('#country-list').html("Your favorites are empty...");
                }
                else {
                    currStorage = JSON.parse(currStorage);
                    var countries = new CountriesCollection (currStorage);
                    var countriesView = new CountriesView({el:"#country-list",model:countries});
                    countriesView.render();
                }
        }
        });

        var router = new AppRouter();
        
        return {
            initialize:initialize
        };
});



















