
define(['jquery','underscore','backbone','models/mapModel','tpl!views/templates/fav_country_view_template.html'],

function($,_,Backbone,MapModel, FavCountryViewTemplate){
    
var FavCountryView = Backbone.View.extend({
    initialize: function () {
       
    },
    events: {
        "click #remBtn":"remFromStorage"
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
    },

    render: function () {
        var data = {country:this.model.toJSON()};  
        
        var mapModel = new MapModel ({coords:data.country.latlng }); 
        data.country.mapURL = mapModel.urlRoot;
        
        var template = FavCountryViewTemplate;
        this.$el.html(template(data));
        return this;
    }

});

return FavCountryView;

});