define(['underscore', 
'backbone',
'collections/items_collection',
'text!../../templates/simpleItem.html',
  'text!../../templates/overview.html' ], 

function (_, Backbone, ItemCollection, simpleItemTemplate, overviewTemplate) {

      var ItemView = Backbone.View.extend({
        tagName: "tr",
        template: simpleItemTemplate,

        render: function () {
          var tmpl = _.template(this.template);
          $(this.el).html(tmpl(this.model.toJSON()));
          return this;
        }
      });

      // List View for all items
      var ItemsView = Backbone.View.extend({
        tagName: "tbody",

        initialize: function (args) {
          console.log('init items view');
          var _this = this;
          console.log(args);
          this.collection.bind("reset",function(){
            _this.render();
          });
          this.collection.fetch();
        },

        render: function () {
          console.log('render list view');
          console.log(this.collection);

          var _this = this;
          _.each(this.collection.models, function (item) {
            console.log(item);
            _this.renderItem(item);
          }, this);
        },

        renderItem: function (item) {
          var itemView = new ItemView({
            model: item
          });
          $(this.el).append(itemView.render().el);
        }
      });

   var OverviewView = Backbone.View.extend({
     el: $("#maincontent"),
     template: overviewTemplate,
     render: function() {
       var tmpl = _.template(this.template);
       $(this.el).empty();
       $(this.el).append(tmpl);
       return this;
     },
     initialize: function() {
       console.log("init overview view");
       this.render();
       var tableView = new ItemsView({el: this.el, collection: this.collection});
       tableView.render();
     }
   });

   return OverviewView;

});
