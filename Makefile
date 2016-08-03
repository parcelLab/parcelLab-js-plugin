bundle:
	@- make clean;
	@echo '🤖  Building JavaScript And CSS! ';
	@node node_modules/webpack/bin/webpack.js --module-bind 'js=babel' --module-bind 'hbs=handlebars' -p ./src/js/index.js ./build/parcelLab.min.js;
	@node node_modules/node-sass/bin/node-sass --output-style compressed  ./src/scss/main.scss  ./build/parcelLab.min.css;
	@echo '🎉  Done! ';

clean:
	@echo '💩  Cleaning up build! ';
	@rm -f ./build/*;

test:
	@echo '🤖 Testing this stuff! ';
	@make bundle;
	@make clean;
	@echo '🎉 Tests finished - wo/ Errors - you are going places boy! ';

deploy:
	@echo '🤖 Deploying this stuff! ';
	make bundle;
	aws s3 cp ./build/parcelLab.min.css s3://parcellab-cdn/css/v2/parcelLab.min.css;
	aws s3 cp ./build/parcelLab.min.js s3://parcellab-cdn/js/v2/parcelLab.min.js;
	cf-invalidate E3R5S2BJQI4RDS css/v2/parcelLab.min.css js/v2/parcelLab.min.js;
	@echo '🕶  Deployed build files! (Do not forget to update the Version File!)';
