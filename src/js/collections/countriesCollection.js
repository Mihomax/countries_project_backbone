
define(['jquery','underscore','backbone','models/countryModel'], 

function($, _, Backbone, CountryModel ) {
    
    var Countries = Backbone.Collection.extend({
        initialize: function(options) {
            this.url = options.url;
        },
        model:CountryModel, 
        
    });

    return Countries;
});



