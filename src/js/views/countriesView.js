
define(['jquery','underscore','backbone','views/countryView','collections/countriesCollection', 'tpl!views/templates/country_sort_view.html'],

function($,_,Backbone,CountryView,CountriesCollection, CountrySortTemplate){
    //will list the countries by receiving collection via common object (bus)
var CountriesView = Backbone.View.extend({

    events: {
        "click #sortBtn":"onSortChoice"
    },
    
    initialize: function () {
        
    },
 
    render: function () {
        this.$el.empty();
        this.$el.html(CountrySortTemplate);
        var self = this;
        this.collection.each(function (eachCountry)  {
             var tempView = new CountryView({model: eachCountry});
             self.$el.append(tempView.render().$el);
        });          
        return this;
    },
    
    onSortChoice: function () {
        var modelsArr = this.collection.models;
         
        var sortBy = $("#sortChoice").val();
        console.log(modelsArr);
        console.log(sortBy);
        if (sortBy === "region") {
            modelsArr.sort(function(a,b) {
                if (a.attributes.region < b.attributes.region) //sort string ascending
                    return -1 
                if (a.attributes.region > b.attributes.region)
                    return 1
                return 0 
            });
           
        }
        else {
            modelsArr.sort(function(a,b) {
                return a.attributes.population - b.attributes.population
            });
        }
        
         this.collection.models = modelsArr;
         this.render();
    }

});
    return CountriesView;

});





