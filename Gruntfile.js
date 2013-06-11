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
					source_map_format: 'V3',
					create_source_map: 'dist/tEmitter.js.map'
				}
			}
		}

	});


	grunt.registerTask('fix', 'fix source map prototype.', function(){
		var mapfile = "dist/tEmitter.js.map";

		var code = grunt.file.read(mapfile);
		code = code.replace(/^"sources":\[[^\]]*?\],$/m, '"sources":["tEmitter.js"],');
		grunt.file.write(mapfile, code);

		var minfile = "dist/tEmitter.min.js",
			version = grunt.config('pkg.version');

		code = grunt.file.read(minfile);
		code = '/*! tEmitter '+version+' | MIT*/'+code +grunt.util.linefeed+'//@ sourceMappingURL=tEmitter.js.map';

		grunt.file.write(minfile, code);

	});



	grunt.registerTask('backup', 'copy backup.', function() {
		var version = grunt.config('pkg.version');
		grunt.file.copy('lib/tEmitter.js', 'lib/tEmitter-'+version+'.js');
		grunt.file.copy('dist/tEmitter.js', 'dist/'+version+'/tEmitter.js');
		grunt.file.copy('dist/tEmitter.min.js', 'dist/'+version+'/tEmitter.min.js');
		grunt.file.copy('dist/tEmitter.js.map', 'dist/'+version+'/tEmitter.js.map');
	});


	grunt.loadNpmTasks('grunt-gcc');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'gcc', 'fix', 'backup']);
};