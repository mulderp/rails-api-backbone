define([
  'jquery',
  'underscore',
  'backbone',
  'models/items',
  'views/sidebar_view',
  'views/about_view',
  'views/overview_view',
  'views/show_project',
  'views/add_item_form',
  'text!../templates/simpleItem.html',
  ], function($, _, Backbone, Items, SidebarView, AboutView, OverviewView, ShowItemView, AddItemForm, simpleItemTemplate, overviewTemplate) {

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

        showAddImage: function() {
          var addImageForm = new AddImageForm({collection: items});
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


      // Initiate the router
      var app_router = new AppRouter();

      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();

      //$("#loading").spin({/* YOUR SPINNER OPTIONS */}).hide();
      $('#loading').ajaxStart(function(){ $(this).fadeIn(); });
      $('#loading').ajaxComplete(function(){ $(this).fadeOut(); });

    };

    return {
      initialize: initialize
    };

  });
