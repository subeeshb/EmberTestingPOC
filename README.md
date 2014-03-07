Ember Integration testing POC
=============================

Getting started
---------------

Ensure that Grunt and Karma have been installed globally. If not, run the following commands:

```
$ npm install -g grunt-cli

$ npm install -g karma
```

Then install the project dependencies by running 

```
$ npm install
```


Building the app
----------------

Build the project and start a server by running the following command:

```
$ grunt web
```

This will build the app to the dist folder and start a server. Open the app in your browser by going to http://localhost:9999


Running tests using QUnit
-------------------------

```
$ grunt qtest
```

The above command will build the app and inject a QUnit runner script and libraries. Run the tests by going to http://localhost:9999/?test

You can also run grunt using the following command to watch for changes to scripts and test cases and automatically build the app when changes are made:

```
$ grunt devtest
```

In this mode, navigate to http://localhost:9999/?test to run tests. After you have made changes, refresh the page to rerun the tests against the updated code without having to run grunt again. 


Running tests using Karma
-------------------------

```
$ grunt test
```

Run the command above to build and run the tests using the Karma test runner. By default, tests will be executed in Chrome (configurable in the karma.conf.js file). A test results summary will also be generated at ./tests/results.html


Editing test cases
------------------

The test cases are defined in *./tests/tests.js*. All application logic, including component code, is in *./js/app.js*. To change the Karma configuration, edit *./karma.conf.js*.
