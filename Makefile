bundle:
	@- make clean;
	@make version;
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

version:
	@echo '🤖  Generating MD5 version tag'
	@date | md5 > VERSION_TAG

deploy:
	@echo '🤖  Deploying this stuff! ';
	@make bundle;
	aws s3 cp ./build/parcelLab.min.css s3://parcellab-cdn/css/v2/parcelLab.min.css;
	aws s3 cp ./build/parcelLab.min.js s3://parcellab-cdn/js/v2/parcelLab.min.js;
	aws s3 cp ./VERSION_TAG s3://parcellab-cdn/js/v2/version.txt;
	cf-invalidate E3R5S2BJQI4RDS css/v2/parcelLab.min.css js/v2/parcelLab.min.js js/v2/version.txt;
	@echo '🕶  Deployed files! Deal with it...';
