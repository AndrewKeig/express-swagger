module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    cafemocha: {
      test: {
          src: 'test/index.js',
          options: {
              ui: 'bdd',
              reporter: 'spec',
          },
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options : {
        "laxcomma" : true
      }
    }
  });
  
  grunt.registerTask('test', [ 'jshint', 'cafemocha:test' ]);
};