Experiments with Rails-API, Rake Pipeline, Backbone, Require.js
================================================================

Client-side: Define assets
---------------------------

    $ vim Assetfile

Rake-pipeline gives a number of filters to work with pre-compilers and assets.


Client-side: Run preview
-------------------------

    $ rakep server

This copies all the assets into /public


Server-side: Setup server
-------------------------

Install dependencies:

    $ bundle install

Note: Rake-pipeline does not yet work with Rake 10.x at this stage

Server-side: Precompile assets
-------------------------------

    $ rakep build

This copies all the assets into /public

Server-side: Start
-------------------

    $ rails s

Experimental Demo
------------------
  http://rails-api-backbone.herokuapp.com
