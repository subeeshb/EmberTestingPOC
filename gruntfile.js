module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // please refer to "path" in package.json
        // defining paths of /scripts/ in app & dist folder
        appScripts: '<%= pkg.path.app %>/<%= pkg.path.scripts %>',
        distScripts: '<%= pkg.path.dist %>/<%= pkg.path.scripts %>',

        // defining paths of /scripts/modules/ in app & dist folder
        appModules: '<%= appScripts %>/<%= pkg.path.modules %>',
        distModules: '<%= distScripts %>/<%= pkg.path.modules %>',

        // defining path of source and compiled template in app folder
        sourceTemplates: '<%= pkg.path.app %>/<%= pkg.path.templates %>/<%= pkg.path.html %>',
        compiledTemplates: '<%= pkg.path.app %>/<%= pkg.path.templates %>/<%= pkg.path.js %>',

        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        ember_handlebars: {
            compile: {
                options: {
                    processName: function(filePath) {
                        var data = filePath.substring(filePath.lastIndexOf('/') + 1,filePath.length);
                        var arr=[];
                        arr = data.split(".");
                        fullName = (filePath.indexOf('/components/') > -1) ? 'components/'+arr[0] : arr[0];
                        return fullName;
                    }
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'templates/html/',      // Src matches are relative to this path.
                        src: ['**/*.handlebars'], // Actual pattern(s) to match.
                        dest: 'templates/js/',   // Destination path prefix.
                        ext: '.js'   // Dest filepaths will have this extension.
                    }
                ]
            }
        },

        concat:{

            main:{
                src:[
                    // File's sequence MATTERS

                    '<%= compiledTemplates %>/application/application.js',
                    '<%= compiledTemplates %>/application/page1.js',

                    '<%= compiledTemplates %>/application/alert.js',

                    '<%= compiledTemplates %>/components/date-field.js',
                    '<%= compiledTemplates %>/components/my-test.js',

                    '<%= appScripts %>/common/documentReadyStart.js',
                    '<%= appScripts %>/common/application.js',
                    '<%= appScripts %>/common/router.js',



                    '<%= appScripts %>/common/documentReadyEnd.js',


                    '<%= appScripts %>/common/utils.js'
                ],
                dest: '<%= distScripts %>/common/common.js'
            },

            library:{
                src:[
                    'js/libs/jquery-1.10.2.js',
                    'js/libs/handlebars-1.1.2.js',
                    'js/libs/ember-1.3.1.js',
                    ],
                dest:'dist/js/libs.js'
            },

            app:{
                src:[
                    'js/app.js',
                    'tests/runner.js',
                    'templates/js/**/*.js'
                    ],
                dest:'dist/js/app.js'
            }
        },

       copy: {
           main: {
               files: [
                   {
                       expand: true,
                       cwd: '.',
                       src: ['index.html', 'data.json'],
                       dest: 'dist'
                   },
                   {
                       expand: true,
                       cwd: 'css',
                       src: ['*.css'],
                       dest: 'dist/css'
                   }
               ]
           }
       },

        clean: {
            dist: "dist/",
            jsTemplate: "app/templates/html/**/*.js"
        },

        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ember-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('default', [
        'clean',
        'ember_handlebars',
        'concat:library',
        'concat:app',
        'copy'
    ]);
};