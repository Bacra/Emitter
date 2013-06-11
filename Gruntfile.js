module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				banner: '/** tEmitter v<%= pkg.version %> */<%= grunt.util.linefeed %>'
			},
			node: {
				src: [
					'src/intro-node.js',
					'src/tEmitter.js',
					'src/outro.js'
				],
				dest: 'lib/tEmitter.js'
			},
			js: {
				src: [
					'src/intro-js.js',
					'src/tEmitter.js',
					'src/outro.js'
				],
				dest: 'dist/tEmitter.js'
			}
		},
		gcc: {
			js: {
				src: 'dist/tEmitter.js',
				dest: 'dist/tEmitter.min.js',
				options: {
					banner: '/*! tEmitter <%= pkg.version %> */',
					source_map_format: 'V3',
					create_source_map: 'dist/tEmitter.js.map'
				}
			}
		}

	});


	grunt.loadNpmTasks('grunt-gcc');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'gcc']);
};