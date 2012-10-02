'use strict';

exports.description = "Grunt init template plugin";
exports.notes = "";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = "*";

exports.template = function(grunt, init, done) {

  var _ = grunt.utils._,
      files = {}
  ;

  grunt.helper('prompt', {type: 'grunt'}, [
    grunt.helper('prompt_for', 'name'),
    grunt.helper('prompt_for', 'version'),
    grunt.helper('prompt_for', 'author_name'),
    grunt.helper('prompt_for', 'author_email'),
    grunt.helper('prompt_for', 'grunt_version'),
    grunt.helper('prompt_for', 'node_version', '*')
  ], function(err, props) {

    // Set a few grunt-plugin-specific properties.
    props.main = 'grunt.js';
    props.npm_test = 'grunt test';
    props.bin = 'bin/' + props.name;
    props.keywords = ['gruntplugin'];

    // Files to copy (and process).
    files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
