
define('CountriesView',['jquery','underscore','backbone','CountryView', 'tpl!views/templates/country_sort_view.html'],

function($,_,Backbone,CountryView, CountrySortTemplate){
    
var CountriesView = Backbone.View.extend({

    events: {
        "click #sortBtn":"onSortChoice",
    },
    
    render: function () {
        this.$el.empty();
        //initially adding a template to its element
        this.$el.html(CountrySortTemplate);
        var self = this;
        this.collection.each(function (eachCountry)  {
             var tempView = new CountryView({model: eachCountry});
             self.$el.append(tempView.render().$el);
        });        
        return this;
    },
    //checks the sortBy option in order to call appropriate method from collection
    onSortChoice: function () {
        var sortBy = $("#sortChoice").val();
        if (sortBy === "population") {
            this.collection.sortByPopulation();
            this.render();
        }
        else {
            this.collection.sortByRegion();
            this.render();
            $("#sortChoice").val("region");
        }
    }

});
    return CountriesView;

});





