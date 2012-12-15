define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {

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
        // url: 'items.json',
        url: 'data/items.json',
        parse: function(response) {
          return response;
        }
      });

      return {Item: Item, MetaItem: MetaItem, ItemCollection: ItemCollection};
});
