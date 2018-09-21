
define(['jquery','underscore','backbone','models/countryModel'], 

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



