deploy:
	@echo '🤖  Deploying this stuff! ';
	aws s3 cp ./dist/index.css s3://parcellab-cdn/css/v4/parcelLab.min.css --cache-control max-age=86400;
	aws s3 cp ./dist/index.js s3://parcellab-cdn/js/v4/parcelLab.min.js --cache-control max-age=86400;
	cf-invalidate E3R5S2BJQI4RDS css/v4/parcelLab.min.css js/v4/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';
