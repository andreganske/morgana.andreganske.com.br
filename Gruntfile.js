module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				files: [{
					expand: true,
					src: 'app/**/*.js',
					dest: 'dist',
					ext: '.min.js'
				}]
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: [{
					expand: true,
					src: 'app/**/*.css',
					dest: 'dist',
					ext: '.min.css'
				}]
			}
		},

		qunit: {
			files: ['test/**/*.html']
		},

		jshint: {
			files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('minify', ['uglify', 'cssmin']);

	grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'cssmin']);

};