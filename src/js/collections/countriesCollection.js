define('CountriesCollection',['jquery','underscore','backbone','CountryModel'], 

function($, _, Backbone, CountryModel ) {
    
    var Countries = Backbone.Collection.extend({
        
        initialize: function(options) {
            this.url = options.url;
        },
        model:CountryModel, 
    
        //method sorts its collection by population
        sortByPopulation: function() {
            this.models.sort(function(a,b) {
                return a.attributes.population - b.attributes.population;
            });
        },
        //method sorts its collection by region 
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



