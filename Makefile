deploy:
	@echo '🤖  Deploying this stuff! ';
	aws s3 cp ./dist/index.css s3://parcellab-cdn/css/v2/parcelLab.min.css --cache-control max-age=86400;
	aws s3 cp ./dist/index.js s3://parcellab-cdn/js/v2/parcelLab.min.js --cache-control max-age=86400;
	cf-invalidate E3R5S2BJQI4RDS css/v2/parcelLab.min.css js/v2/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';

deploy-v3:
	@echo '🤖  Deploying this stuff - v3! ';
	aws s3 cp ./dist/index.css s3://parcellab-cdn/css/v3/parcelLab.min.css --cache-control max-age=86400;
	aws s3 cp ./dist/index.js s3://parcellab-cdn/js/v3/parcelLab.min.js --cache-control max-age=86400;
	cf-invalidate E3R5S2BJQI4RDS css/v3/parcelLab.min.css js/v3/parcelLab.min.js;
	@echo '🕶  Deployed files! Deal with it...';
