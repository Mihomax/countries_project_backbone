
define(['jquery','underscore','backbone','views/favCountryView'],

function($,_,Backbone,FavCountryView){
    
var FavCountriesView = Backbone.View.extend({
    
    initialize: function () {
        this.render();
        
    },
   
    render: function () {
        this.$el.empty();
        var self = this;
        this.model.each(function (eachCountry)  {
            var tempView = new FavCountryView({model: eachCountry});
            self.$el.append(tempView.render().$el);
        });
                    
        return this;
    }    
});
    return FavCountriesView;

});





