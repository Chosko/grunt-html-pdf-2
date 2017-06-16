'use strict';

var pdf = require('html-pdf');

module.exports = function(grunt) {

    grunt.registerMultiTask('html_pdf', 'Grunt wrapper for the Node package html-pdf', function() {
        var options = this.options({
            separator: "\n"
        });

        var done = this.async(),
            async = grunt.util.async;

        var count = this.files.length;
        grunt.log.ok("count value is:  " + count)

        async.forEach(this.files, function(f) {

            var path;
            var src =   f.src
                        .filter(function(filepath) {
                            if (!grunt.file.exists(filepath)) {
                                grunt.log.warn("Source file \"" + filepath + "\" not found.");
                                return false;
                            } else {
                                path = filepath
                                return true;
                            }
                        })
                        .map(function(filepath) {
                            return grunt.file.read(filepath);
                        })
                        .join(grunt.util.normalizelf(options.separator));

            pdf.create(src, options).toFile(f.dest, function(err, res){
                 grunt.log.ok("Successfully created " + f.dest);
            })
        });
    });

};
