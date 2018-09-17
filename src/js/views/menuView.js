define(['jquery','underscore','backbone','collections/countriesCollection','views/favCountriesView'],

function($,_,Backbone, CountriesCollection,FavCountriesView){
    
var MenuView = Backbone.View.extend({
    
    initialize: function () {
       this.render();
    },
    events: {
        "click #fav-btn": "showFavCountries"
    },

    showFavCountries: function () {
        var currStorage = localStorage.getItem("userLocalStorage");
        if (!currStorage || currStorage.length <= 2 ) {

            $('#country-list').html("Your favorites are empty...");
        }
        else {
            currStorage = JSON.parse(currStorage);
            var countries = new CountriesCollection (currStorage);
            var favCountriesView = new FavCountriesView({el:"#country-list",model:countries});
        }
    },  
    render: function() {
        this.$el.html('<div id="menu"><button class="nav-btn" id="home-btn">Home</button><button class="nav-btn" id="fav-btn">My favorite countries</button></div>');
        $('#navBar').html(this.$el);
      }
       
    });

    return MenuView;
    
    });