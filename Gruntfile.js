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

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:mfouquet/workmanship.git',
          branch: 'gh-pages'
        }
      }
    }
  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-sass');

  // Generate the CSS, do Jekyll stuff, add vendor prefixes
  grunt.registerTask('default', ['sass', 'jekyll', 'postcss']);

  // Publish to GitHub under the gh-pages branch
  grunt.registerTask('publish', ['jekyll', 'postcss:dist', 'buildcontrol:pages']);
};
