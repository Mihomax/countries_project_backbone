
define([
    'jquery',
    'underscore',
    'backbone',
    'models/mapModel',
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
        
        var mapModel = new MapModel ({coords:data.country.latlng }); 
        data.country.mapURL = mapModel.urlRoot;

        var languages = data.country.languages;
        
        // console.log(languages);
        //checking data structure, small change if data is its initial version (received from API ), if not, in localstorage its already done
        if (languages[0]["name"]) {
            languages.forEach(function (lang,key) {
                return languages[key]=lang.name;
            });
            data.country.languages = languages.join();
        }
        
         // checking if country is in localstorage or no, in order to decide which template of countryView to load
        var storage = localStorage.getItem("userLocalStorage");
        storage = JSON.parse(storage);
        var template = CountryViewTemplate;
        
        for (var i =0;i<storage.length;i++) {
            if (storage[i].name === data.country.name) {
                template = FavCountryViewTemplate;
            }
        };
        
         this.$el.html(template(data));
        return this;
    },

    addToStorage: function () {

        //adding data to localstorage
        
        var currStorage = localStorage.getItem("userLocalStorage");

        if (currStorage) {
            var selectedCountry = this.model.toJSON();
            var countriesArray = JSON.parse(currStorage); 

            for (var i = 0; i <countriesArray.length;i++) {
                if (countriesArray[i].name ===selectedCountry.name) {
                    console.log(countriesArray[i].name);
                    alert("You already have this country in your favorites, please choose another one.");
                    return false;
                } 
            }
            
            countriesArray.push(selectedCountry);
            countriesArray = JSON.stringify(countriesArray);
            localStorage.setItem("userLocalStorage", countriesArray);
        }
        else {
            var selectedCountry = this.model.toJSON();
            var countryArray = [selectedCountry];
            countryArray = JSON.stringify(countryArray);
            localStorage.setItem("userLocalStorage", countryArray);  
        }

    },
    remFromStorage: function () {
        
        var currStorage = localStorage.getItem("userLocalStorage");
        var selectedCountry = this.model.toJSON();
        
        var countriesArray = JSON.parse(currStorage); 
            
        for (var i = 0; i <countriesArray.length;i++) {
            if (countriesArray[i].name ===selectedCountry.name) {
                countriesArray.splice(i,1);
            } 
        }
        countriesArray = JSON.stringify(countriesArray);
        localStorage.setItem("userLocalStorage", countriesArray); 
        this.remove() ;
    }

});

return CountryView;

});