require.config({

	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
        spinner: 'libs/spinner',
		text: 'libs/require/text'
	},

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
        spinner: {
          deps: ["jquery"],
          exports: "Spinner"
        }
	}

});

require(['app'],
function(App){
	App.initialize();
});
