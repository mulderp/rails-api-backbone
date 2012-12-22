define([
  'jquery',
  'underscore',
  'backbone',
  'models/items',
  'views/sidebar_view',
  'views/about_view',
  'views/overview_view',
  'views/show_project',
  'text!../templates/simpleItem.html',
  'text!../templates/addItem.html'
  ], function($, _, Backbone, Items, SidebarView, AboutView, OverviewView, ShowItemView, simpleItemTemplate, addItemTemplate, overviewTemplate) {

    var initialize = function() {

      console.log("application init");

      // Router
      var AppRouter = Backbone.Router.extend({
        routes: {
          'about': 'showAbout', // matches http://example.com/#dashboard
          'new': 'showAddForm',
          'projects/:id': 'showProject',
          '*actions': 'showMainpage'
        },

        showAbout: function() {
          console.log('show about');
          var aboutView = new AboutView();
          aboutView.render();
        },

        showMainpage: function() {
          console.log('show mainpage');
          var sidebar = new SidebarView();
          var items = new Items.ItemCollection();
          var mainview = new OverviewView({collection: items});
        },

        showAddForm: function() {
          var sidebar = new SidebarView();
          var items = new Items.ItemCollection();
          var addItemForm = new AddItemForm({collection: items});
        },

        showProject: function(id) {
          console.log("*** #{id}");
          console.log(id);
          var sidebar = new SidebarView();
          var showView = new ShowItemView({el: $("#maincontent")});
          showView.render();
        }
      });

      // Models
      var Item = Backbone.Model.extend({
        defaults: {
          name: 'noname',
          img: "/img/profile_dummy.jpg"
        }
      });

      var MetaItem = Backbone.Model.extend({
        urlRoot : '/data/profile.json',
        parse: function(response) {
          console.log(response);
          return response;
        }
      });

      // Item View for single item
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
