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
	aws s3 cp ./build/parcelLab.min.css s3://parcellab-cdn/css/v2/parcelLab.min.css;
	aws s3 cp ./build/parcelLab.min.js s3://parcellab-cdn/js/v2/parcelLab.min.js;
	cf-invalidate E3R5S2BJQI4RDS css/v2/parcelLab.min.css js/v2/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';

deploy-v3:
	@echo '🤖  Deploying this stuff - v3! ';
	@make bundle;
	aws s3 cp ./build/parcelLab.min.css s3://parcellab-cdn/css/v3/parcelLab.min.css;
	aws s3 cp ./build/parcelLab.min.js s3://parcellab-cdn/js/v3/parcelLab.min.js;
	cf-invalidate E3R5S2BJQI4RDS css/v3/parcelLab.min.css js/v3/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';
