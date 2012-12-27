require.config({

	paths: {
		jquery: 'libs/jquery/jquery',
        'jquery.ui.widget': 'libs/jQuery-File-Upload/js/vendor/jquery.ui.widget',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
        fileupload: 'libs/jQuery-File-Upload/js/jquery.fileupload',
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
        fileupload: {
          deps: ["jquery"],
          exports: "FileUpload"
        }
	}

});

require(['app'],
function(App){
	App.initialize();
});
