
define(['jquery','underscore','backbone','models/mapModel','tpl!views/templates/country_view_template.html'],

function($,_,Backbone,MapModel, CountryViewTemplate){
    
var CountryView = Backbone.View.extend({
    initialize: function () {
       
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