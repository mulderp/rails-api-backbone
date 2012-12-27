define(['underscore', 
'backbone',
'fileupload',
'collections/items_collection',
'views/add_image',
  'text!../../templates/addItem.html'
 ], 

function (_, Backbone, FileUpload, ItemCollection, AddImageView, addItemTemplate) {
      // Item View for single item
      var AddItemForm = Backbone.View.extend({
        el: $("#maincontent"),
        template: addItemTemplate,

        render: function() {
          $(this.el).html(_.template(this.template));
          var method = ['PUT', 'http://example.com/upload'];
          var url = "/upload";
          var that = this;
          $(this.el).fileupload({
             dataType: 'json',
             // type: method,
             url: url,
             formData: {"_method": method},
             done: function(e, data) {
          //     that.model.set({id: data.result.id});
               that.render();
             }
           });
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


      return AddItemForm;
});


