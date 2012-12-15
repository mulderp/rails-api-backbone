define([
  'jquery',
  'underscore',
  'backbone',
  'models/items',
  'text!../templates/sidebar/sidebar.html',
  'text!../templates/items/simpleItem.html',
  'text!../templates/items/addItem.html',
  'text!../templates/items/overview.html'
  ], function($, _, Backbone, Items, sidebarTemplate, simpleItemTemplate, addItemTemplate, overviewTemplate) {

    console.log(Items);
    var initialize = function() {

      console.log("application init");

      // Router
      var AppRouter = Backbone.Router.extend({
        routes: {
          'about': 'showAbout', // matches http://example.com/#about
          '*actions': 'showMainpage'
        },

        showAbout: function() {
          console.log('show about');
          $("#maincontent").html('<h1>About</h1>');
        },

        showMainpage: function() {
          console.log('show mainpage');
          var itemsView = new OverviewView({ el: $("#maincontent")});
          var sidebar = new SidebarView({el: $("#sidebar")});
        }

      });


      var SidebarView = Backbone.View.extend({
        template: sidebarTemplate,
        render: function() {
          var tmpl = _.template(this.template);
          $(this.el).empty();
          $(this.el).append(tmpl);
          return this;
        },
        initialize: function() {
          this.render();
        }
      });

      // Item View for single item
      var ItemView = Backbone.View.extend({
        tagName: "tr",
        template: simpleItemTemplate,

        render: function () {
          var tmpl = _.template(this.template);
          $(this.el).html(tmpl(this.model.toJSON()));
          return this;
        }
      });

      var OverviewView = Backbone.View.extend({
        template: overviewTemplate,
        initialize: function() {
          console.log("init overview view ", arguments);
          this.items = new Items.ItemCollection();
          this.items.fetch();
          var _this = this;
          this.items.bind("reset",function(){
            _this.render();
          });
          this.items.bind("add", function(event) {
            _this.renderItem(event);
          });
        },

        render: function() {
          var tmpl = _.template(this.template);
          $(this.el).html(tmpl);
          var _this = this;
          _.each(this.items.models, function (item) {
            console.log(item);
            _this.renderItem(item);
          }, this);
          var addItemForm = new AddItemForm();
          return this;
        },
        renderItem: function (item) {
          var itemView = new ItemView({
            model: item
          });
          this.el.append(itemView.render().el);
        }
      });



      var AddItemForm = Backbone.View.extend({
        el: $("#maincontent"),
        template: addItemTemplate,

        render: function() {
          $(this.el).html(_.template(this.template));
        },
        initialize: function() {
          this.render();
        },
        events: {
          "submit": "submit"
        },
        submit: function(event) {
          event.preventDefault();
          this.collection.create({
            name: this.$("#name").val()
          });
          console.log("submit add item", this.$("#name").val());
        }

      });



      // Initiate the router
      var app_router = new AppRouter();

      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();


    };

    return {
      initialize: initialize
    };

  });
