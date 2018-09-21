module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        concat: require('./.grunt/concat'),
        uglify: require('./.grunt/uglify'),
        copy: require('./.grunt/copy'),
        replace: require('./.grunt/replace'),
        less: require('./.grunt/less'),
    
      });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-less');


    grunt.registerTask('build', ['copy:copy_files','replace:main_change','concat:js','less:convert','uglify:minify_js']);
    
};