
define('CountryView',[
    'jquery',
    'underscore',
    'backbone',
    'MapModel',
    'tpl!views/templates/country_view_template.html',
    'tpl!views/templates/fav_country_view_template.html'],

function($,_,Backbone,MapModel, CountryViewTemplate, FavCountryViewTemplate){
    
var CountryView = Backbone.View.extend({
   
    events: {
        "click .fav-btn":"addToStorage",
        "click #remBtn":"remFromStorage"
    },

    initialize: function () {
        
    },

    render: function () {

        this.$el.empty();        
        var data = {country:this.model.toJSON()};  
        
        //with initiation of MapModel sending current country's location
        var mapModel = new MapModel ({coords:data.country.latlng }); 
        data.country.mapURL = mapModel.urlRoot;

        var languages = data.country.languages;
      
        //checking data structure, small change if data is its initial version (received from API ), 
        //if not, in localstorage its already done
        if (languages[0]["name"]) {
            languages.forEach(function (lang,key) {
                return languages[key]=lang.name;
            });
            data.country.languages = languages.join();
        }
        
        var template = CountryViewTemplate;
        // checking if country is in localstorage or no, in order to decide which template of countryView to load
        var storage = localStorage.getItem("userLocalStorage");
        if (storage !== null) {
            storage = JSON.parse(storage);
            for (var i =0;i<storage.length;i++) {
                if (storage[i].name === data.country.name) {
                    template = FavCountryViewTemplate;
                }
            };
        }
        this.$el.html(template(data));
        return this;
    },

    addToStorage: function () {
        this.model.addCountry();
    },

    remFromStorage: function () {
        this.model.removeCountry();
        this.remove() ;
    }

});

return CountryView;

});