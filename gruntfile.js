module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'TEST' }
    },
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
  
  grunt.registerTask('test', [ 'jshint', 'env:test','cafemocha:test' ]);
};