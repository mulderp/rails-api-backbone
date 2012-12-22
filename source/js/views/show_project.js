define(['underscore', 'backbone',
  'text!../../templates/showProject.html' ], 

function (_, Backbone, showTemplate) {
  var ShowView = Backbone.View.extend({
    template: showTemplate,
    render: function() {
      var tmpl = _.template(this.template);
      $(this.el).empty();
      $(this.el).append(tmpl);
      return this;
    }
  });

  return ShowView;
});
