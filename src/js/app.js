
define(['jquery','underscore','backbone','views/menuView', 'views/countrySearchView', 'views/countriesView', "models/mapModel"],

function($,_,Backbone,MenuView,CountrySearchView,CountriesView, MapModel){
    var initialize = function(){

    var menuView = new MenuView();
            
    //this guy is just a common object(property) for my both views (CountrySearchView and CountriesView) in order to pass data between them
    var bus = _.extend({},Backbone.Events);

    // sending my common object with instantiation of countrySearchView
    var countrySearchView = new CountrySearchView({
        bus:bus
}); 

var countriesView = new CountriesView({el:"#country-list",  bus:bus });

var map = new MapModel();
map.fetch({
    success: function(res){
        $("#testDiv").html(res);
    }
});


        }
        return {
            initialize:initialize
        };
});



















