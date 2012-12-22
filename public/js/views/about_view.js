define(['underscore', 'backbone',
  'text!../../templates/about.html' ], 

function (_, Backbone, aboutTemplate) {
  var SidebarView = Backbone.View.extend({
    el: $("#maincontent"),
    template: aboutTemplate,
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
  return SidebarView;
});
