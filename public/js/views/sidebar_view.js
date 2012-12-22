define(['underscore', 'backbone',
  'text!../../templates/sidebar.html' ], 

function (_, Backbone, sidebarTemplate) {
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
  return SidebarView;
});
