module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compile the Sass
    sass: {
      options: {
        precision: 6,
        sourceComments: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'css/workmanship.css': 'scss/workmanship.scss'
        }
      }
    },

    // Add on vendor prefixes
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: ['last 2 versions', 'ie 9'] })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    // Build related
    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'postcss']
      }
    },

    jekyll: {
      options: {
        src: '.',
        dest: '_site',
        config: '_config.yml'
      }
    },
  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass', 'jekyll', 'postcss']);
};
