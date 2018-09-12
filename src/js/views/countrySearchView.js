define(['jquery','underscore','backbone', 'collections/countriesCollection', 'tpl!views/templates/country_search_view.html'],

function($,_,Backbone, CountriesCollection, SearchViewTemplate){
    //my first view from which I take user's typed value
    
    var CountrySearchView = Backbone.View.extend({
    
    initialize: function (options) {
        this.bus = options.bus;
        this.render();
    },

    el: "#searchDiv",

    events: {
        "click #searchBtn": "onClickSearch"
    },

    onClickSearch: function () {
        var typedValue = $("#typedCountry").val();                      
        var countries = new CountriesCollection ({url:"https://restcountries.eu/rest/v2/name/" + typedValue}); // my collection with url(endpoint typed by user)

        this.bus.trigger("injectCollection", countries)     // publishing event and sending my collection                                                  
        $("#typedCountry").val("");
        
    },
    
    render: function () {
        //var template = _.template($("#searchTemplate").html(), {});
        var template = SearchViewTemplate;
        this.$el.html(template);
        return this;
    }
});
    return CountrySearchView;

});

