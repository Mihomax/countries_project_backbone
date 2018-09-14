
define(['jquery','underscore','backbone','views/countryView'],

function($,_,Backbone,CountryView){
    //will list the countries by receiving collection via common object (bus)
var CountriesView = Backbone.View.extend({
    
    initialize: function (options) {
        this.bus = options.bus;
        this.bus.on("injectCollection", this.injectCollection, this);  
    },
    injectCollection: function(received) {
        
        this.model = received;
        var self = this;
        this.model.fetch({
            success: function(res) {
                self.render();
            }
        });        
    },

    render: function () {
        this.$el.empty();
        var self = this;
        this.model.each(function (eachCountry)  {
            var tempView = new CountryView({model: eachCountry});
            self.$el.append(tempView.render().$el);
        });
                    
        return this;
    }    
});
    return CountriesView;

});





