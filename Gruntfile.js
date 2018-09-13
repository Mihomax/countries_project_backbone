module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        concat: require('./.grunt/concat'),
        uglify: require('./.grunt/uglify')

      });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat:js','uglify:minify_js']);
    
};