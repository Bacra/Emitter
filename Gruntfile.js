module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		gcc: {
			Emitter: {
				src: 'src/emitter.js',
				dest: 'dist/emitter.min.js',
				options: {
					banner: '/*! MisEvent <%= pkg.version %> */',
					source_map_format: 'V3',
					create_source_map: 'dist/emitter.js.map'
				}
			}
		}

	});


	grunt.registerTask('embed', 'Embed version etc.', function() {
		var version = grunt.config('pkg.version');

		var code = grunt.file.read('./src/emitter.js');
		code = code.replace(/@VERSION/g, version);
		grunt.file.write('./lib/emitter.js', code);

		grunt.log.writeln('@VERSION is replaced to "' + version + '".');
	});

	grunt.loadNpmTasks('grunt-gcc');

	grunt.registerTask('default', ['embed', 'gcc']);
};