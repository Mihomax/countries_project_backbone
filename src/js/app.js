
define(['jquery','underscore','backbone', 'views/countrySearchView', 'views/countriesView'],

function($,_,Backbone,CountrySearchView,CountriesView){
    var initialize = function(){
            
    //this guy is just a common object(property) for my both views (CountrySearchView and CountriesView) in order to pass data between them
    var bus = _.extend({},Backbone.Events);

    // sending my common object with instantiation of countrySearchView
    var countrySearchView = new CountrySearchView({
        bus:bus
}); 

var countriesView = new CountriesView({el:"#country-list",  bus:bus });

        }
        return {
            initialize:initialize
        };
});



















