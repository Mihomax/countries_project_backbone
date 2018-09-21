
define('CountriesView',['jquery','underscore','backbone','CountryView', 'tpl!views/templates/country_sort_view.html'],

function($,_,Backbone,CountryView, CountrySortTemplate){
    
var CountriesView = Backbone.View.extend({

    events: {
        "click #sortBtn":"onSortChoice",
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
        var sortBy = $("#sortChoice").val();
        if (sortBy === "population") {
            this.collection.sortByPopulation();
            this.render();
        }
        else {
            this.collection.sortByRegion();
            this.render();
        }
    }

});
    return CountriesView;

});





