
define(['jquery','underscore','backbone','views/countryView','tpl!views/templates/countries_view_template.html'],

function($,_,Backbone,CountryView,CountriesViewTemplate){
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

    //
    render: function () {
        this.$el.empty();
        this.$el.html(CountriesViewTemplate);
        this.model.each(function (eachCountry)  {
            var tempView = new CountryView({model: eachCountry});
            $("#country-list-body").append(tempView.render().$el);
        });
                    
        return this;
    }


    // render: function () {
    //     this.$el.empty();
    //     var data = {countries:this.model.toJSON()}; // object must be sent to template
    //     var template = CountriesViewTemplate;
    //     this.$el.html(template(data));
    // }
    
});
    return CountriesView;

});





