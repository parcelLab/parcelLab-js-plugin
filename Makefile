bundle:
	@- make clean;
	@echo '🤖  Building JavaScript And CSS! ';
	@node node_modules/webpack/bin/webpack.js --module-bind 'js=babel?presets[]=es2015' -p ./src/js/index.js ./build/parcelLab.min.js;
	@node node_modules/node-sass/bin/node-sass --output-style compressed  ./src/scss/main.scss  ./build/parcelLab.min.css;
	@echo '🎉  Done! ';

clean:
	@echo '💩  Cleaning up build! ';
	@rm -f ./build/*;
	@echo '🎉  Done! ';

test:
	@echo '🤖 Testing this stuff! ';
	@make bundle;
	@make clean;
	@echo '🎉 Tests finished - wo/ Errors - you are going places boy! ';
