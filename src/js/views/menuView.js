define(['jquery','underscore','backbone','collections/countriesCollection'],

function($,_,Backbone, CountriesCollection){
    
var MenuView = Backbone.View.extend({
    
    events: {
        "click":"onClick"
    },

    initialize: function (options) {
       this.router = options.router;
    },

    render: function() {
        this.$el.html('<div id="menu"><button data-url= "home" class="nav-btn" id="home-btn">Home</button><button data-url= "favorites" class="nav-btn" id="fav-btn">My favorite countries</button></div>');
         $('#navBar').html(this.$el);
      },
       
    onClick: function(event){
        var $btn = $(event.target);
        this.router.navigate($btn.attr("data-url"), {trigger:true});
    }
});

return MenuView;
    
});