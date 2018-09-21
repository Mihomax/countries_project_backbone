define(['jquery','underscore','backbone', 'tpl!views/templates/menu_view_template.html'],

function($,_,Backbone, MenuViewTemplate){
    
var MenuView = Backbone.View.extend({
    
    events: {
        "click":"onClick"
    },

    initialize: function (options) {
       this.router = options.router;
    },

    render: function() {
        this.$el.html(MenuViewTemplate);
         $('#navBar').html(this.$el);
      },
       
    onClick: function(event){
        var $btn = $(event.target);
        this.router.navigate($btn.attr("data-url"), {trigger:true});
    }
});

return MenuView;
    
});