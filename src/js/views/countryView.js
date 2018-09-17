
define(['jquery','underscore','backbone','models/mapModel','tpl!views/templates/country_view_template.html'],

function($,_,Backbone,MapModel, CountryViewTemplate){
    
var CountryView = Backbone.View.extend({
    initialize: function () {
       
    },
    events: {
        "click .fav-btn":"addToStorage"
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


        //changing btn UI

        $('#favBtn').html("V")


    },

    render: function () {
        var data = {country:this.model.toJSON()};  
        
        var mapModel = new MapModel ({coords:data.country.latlng }); 
        data.country.mapURL = mapModel.urlRoot;

        var languages = data.country.languages;
        languages.forEach(function (lang,key) {
            return languages[key]=lang.name
        });
        data.country.languages = languages.join();
        
        var template = CountryViewTemplate;
        this.$el.html(template(data));
        return this;
    }

});

return CountryView;

});