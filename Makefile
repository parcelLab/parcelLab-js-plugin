bundle:
	@- make clean;
	@echo '🤖  Building JavaScript And CSS! ';
	@node node_modules/webpack/bin/webpack.js -p;
	@echo '🎉  Done! ';

clean:
	@echo '💩  Cleaning up build! ';
	@rm -f ./build/*;

test:
	@echo '🤖  Testing this stuff! ';
	@make bundle;
	@make clean;
	@echo '🎉  Tests finished - wo/ Errors';

deploy:
	@echo '🤖  Deploying this stuff! ';
	@make bundle;
	aws s3 cp ./build/parcelLab.min.css s3://parcellab-cdn/css/legacy/parcelLab.min.css;
	aws s3 cp ./build/parcelLab.min.js s3://parcellab-cdn/js/legacy/parcelLab.min.js;
	cf-invalidate E3R5S2BJQI4RDS css/legacy/parcelLab.min.css js/legacy/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';
