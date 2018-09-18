
define(['jquery','underscore','backbone','views/countryView', 'tpl!views/templates/country_filter_view.html'],

function($,_,Backbone,CountryView, CountryFilterTemplate){
    //will list the countries by receiving collection via common object (bus)
var CountriesView = Backbone.View.extend({
    
    initialize: function (options) {
        if(options.bus) {
            this.bus = options.bus;
            this.bus.on("injectCollection", this.injectCollection, this);  
        }

    },
    injectCollection: function(received) { 
        this.model = received;
        var self = this;
        this.model.fetch({
            success: function(res) {
                self.render();
            },
            error: function() {
                throw new Error("Something went wrong");
            }
        });        
    },

    render: function () {
        
        this.$el.empty();
        this.$el.html(CountryFilterTemplate);
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





