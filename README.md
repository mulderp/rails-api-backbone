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

Server-side: Precompile assets
-------------------------------

    $ rakep build

This copies all the assets into /public
