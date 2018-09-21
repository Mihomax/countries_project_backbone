
define('CountriesView',['jquery','underscore','backbone','CountryView', 'tpl!views/templates/country_sort_view.html'],

function($,_,Backbone,CountryView, CountrySortTemplate){
    
var CountriesView = Backbone.View.extend({

    events: {
        "click #sortBtn":"onSortChoice",
    },
    
    initialize: function () {
       
    },
 
    render: function () {
        
        this.$el.empty();
        this.$el.html(CountrySortTemplate);
        var self = this;
        this.collection.each(function (eachCountry)  {
             var tempView = new CountryView({model: eachCountry});
             self.$el.append(tempView.render().$el);
        });        
        return this;
    },
    
    onSortChoice: function () {
        var sortBy = $("#sortChoice").val();
        if (sortBy === "population") {
            this.collection.sortByPopulation();
            this.render();
        }
        else {
            this.collection.sortByRegion();
            this.render();
        }
    }

});
    return CountriesView;

});






define('CountrySearchView',[
    'jquery',
    'underscore',
    'backbone', 
    'CountriesCollection',
    'CountriesView', 
    'tpl!views/templates/country_search_view.html'],

function($,_,Backbone, CountriesCollection,CountriesView, SearchViewTemplate){
    
    var CountrySearchView = Backbone.View.extend({
    
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
        this.model.addCountry();
    },

    remFromStorage: function () {
        this.model.removeCountry();
        this.remove() ;
    }

});

return CountryView;

});
define('MenuView',['jquery','underscore','backbone', 'tpl!views/templates/menu_view_template.html'],

function($,_,Backbone, MenuViewTemplate){
    
var MenuView = Backbone.View.extend({
    
    events: {
        "click":"onClick"
    },

    initialize: function (options) {
       this.router = options.router;
    },

    render: function() {
        this.$el.html(MenuViewTemplate);
         $('#navBar').html(this.$el);
      },
       
    onClick: function(event){
        var $btn = $(event.target);
        this.router.navigate($btn.attr("data-url"), {trigger:true});
    }
});

return MenuView;
    
});
define('CountryModel',['jquery','underscore','backbone'], function($,_,Backbone){

    var Country = Backbone.Model.extend({

    addCountry: function() {
            
        var currStorage = localStorage.getItem("userLocalStorage");

        if (currStorage) {
            var selectedCountry = this.toJSON();
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
            var selectedCountry = this.toJSON();
            var countryArray = [selectedCountry];
            countryArray = JSON.stringify(countryArray);
            localStorage.setItem("userLocalStorage", countryArray);  
        }
    },

    removeCountry: function () {
        var selectedCountry = this.toJSON();
        var currStorage = localStorage.getItem("userLocalStorage");
        var countriesArray = JSON.parse(currStorage); 
         
        for (var i = 0; i <countriesArray.length;i++) {
            if (countriesArray[i].name ===selectedCountry.name) {
                countriesArray.splice(i,1);
            } 
        }
        countriesArray = JSON.stringify(countriesArray);
        localStorage.setItem("userLocalStorage", countriesArray); 
    }


    });
    return Country;
});



define('MapModel',['jquery','underscore','backbone'], function($,_,Backbone){

    var Map = Backbone.Model.extend({

        defaults: {
            coords: []
        },

        initialize: function () {
            var coords = this.get("coords");
            //this.urlRoot = "https://maps.googleapis.com/maps/api/staticmap?center="+coords[0]+","+coords[1]+"&markers=color:red%7C"+coords[0]+","+coords[1]+"&zoom=5&size=400x300&key=AIzaSyD9I97w_-iHLyclKuVZBJkQdwSleLbjGyw";
            this.urlRoot = "#";
        },
 
    });
    return Map;
});

define('CountriesCollection',['jquery','underscore','backbone','CountryModel'], 

function($, _, Backbone, CountryModel ) {
    
    var Countries = Backbone.Collection.extend({
        
        initialize: function(options) {
            this.url = options.url;
        },
        model:CountryModel, 

        sortByPopulation: function() {

            this.models.sort(function(a,b) {
                return a.attributes.population - b.attributes.population;
            });
        },
         sortByRegion: function() {
            this.models.sort(function(a,b) {
                if (a.attributes.region < b.attributes.region) //sort string ascending
                    return -1 
                if (a.attributes.region > b.attributes.region)
                    return 1
                return 0 
            });
            
         } 
    });

    return Countries;
});



