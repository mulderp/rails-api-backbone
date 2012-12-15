define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/sidebar/sidebar.html',
  'text!../templates/items/simpleItem.html',
  'text!../templates/items/addItem.html',
  'text!../templates/items/overview.html'
  ], function($, _, Backbone, sidebarTemplate, simpleItemTemplate, addItemTemplate, overviewTemplate) {

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
          var sidebar = new SidebarView();
          var items = new ItemCollection();
          var itemsView = new OverviewView({collection: items});
          var addItemForm = new AddItemForm({collection: items});
        }

      });


      // Models
      var Item = Backbone.Model.extend({
        defaults: {
          name: 'noname',
          created_at: 'new'
        }
      });

      var MetaItem = Backbone.Model.extend({
        urlRoot : 'meta.json',
        parse: function(response) {
          console.log(response);
          return response;
        }
      });

      // Collection
      var ItemCollection = Backbone.Collection.extend({
        model: Item,
        url: 'items.json',
        // url: 'data/items.json',
        parse: function(response) {
          return response;
        }
      });


      var SidebarView = Backbone.View.extend({
        el: $("#sidebar"),
        className: "sidebar",
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
        el: $("#maincontent"),
        template: overviewTemplate,
        render: function() {
          var tmpl = _.template(this.template);
          $(this.el).empty();
          $(this.el).append(tmpl);
          return this;
        },
        initialize: function() {
          console.log("init overview view ", arguments);
          this.render();
          var tableView = new ItemsView({el: this.el, collection: this.collection});
          tableView.render();
        }
      });



      // List View for all items
      var ItemsView = Backbone.View.extend({
        tagName: "tbody",

        initialize: function () {
          console.log('init items view');
          var _this = this;
          this.collection.bind("reset",function(){
            _this.render();
          });
          this.collection.bind("add", function(event) {
            _this.renderItem(event);

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
