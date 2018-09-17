define(['jquery','underscore','backbone'], function($,_,Backbone){

    var Map = Backbone.Model.extend({

        defaults: {
            coords: []
        },

        initialize: function () {
            var coords = this.get("coords");
            this.urlRoot = "https://maps.googleapis.com/maps/api/staticmap?center="+coords[0]+","+coords[1]+"&markers=color:red%7C"+coords[0]+","+coords[1]+"&zoom=5&size=400x300&key=AIzaSyD9I97w_-iHLyclKuVZBJkQdwSleLbjGyw";
            //this.urlRoot = "#";
        },
 
    });
    return Map;
});