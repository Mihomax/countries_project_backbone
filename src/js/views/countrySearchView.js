define(['jquery','underscore','backbone', 'collections/countriesCollection','views/countriesView', 'tpl!views/templates/country_search_view.html'],

function($,_,Backbone, CountriesCollection,CountriesView, SearchViewTemplate){
    //my first view from which I take user's typed value
    
    var CountrySearchView = Backbone.View.extend({
    
    initialize: function (options) {
        this.search_countries = options.search_countries;
    },

    el: "#searchDiv",

    events: {
        "click #searchBtn": "onClickSearch"
    },

    onClickSearch: function () {
        var typedValue = $("#typedCountry").val(); 
        var regex = /^[A-Za-z]+$/;
        if (!typedValue || !typedValue.match(regex)) {
            
            $('#country-list').html("Oops ... please type letters in the field");
        }
        else {
            var countries = new CountriesCollection ({url:"https://restcountries.eu/rest/v2/name/" + typedValue}); // my collection with url(endpoint typed by user)
            countries.fetch({
                success: function() {
                    var searchedCountriesView = new CountriesView({ el: "#country-list", collection: countries})
                    searchedCountriesView.render();
                },
                error: function() {
                    // throw new Error("Something went wrong");
                    $("#country-list").html("Sorry we could not find your country");
                }                
            });                                                
             $("#typedCountry").val("");
        }
    },
    
    render: function () {
        var template = SearchViewTemplate;
        this.$el.html(template);
        return this;
    }
});
    return CountrySearchView;

});


