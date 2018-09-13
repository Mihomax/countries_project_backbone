
define(['jquery','underscore','backbone','tpl!views/templates/country_view_template.html'],

function($,_,Backbone, CountryViewTemplate){
    
var CountryView = Backbone.View.extend({
    initialize: function () {
       
    },
    tagName: "tr",
    render: function () {
        this.$el.empty();
        var data = {country:this.model.toJSON()}; 
        var template = CountryViewTemplate;
        this.$el.html(template(data));

        return this;
    }

});

return CountryView;

});