AWS_PROFILE ?= terraform-dev

.PHONY: fuse

fuse:
	yarn install --ignore-scripts && grunt
	# Resolve S3 bucket from SSM and sync
	@BUCKET=$$(aws ssm get-parameter \
		--name /laravel/satellite-apps-bucket \
		--query Parameter.Value \
		--output text \
		--profile $(AWS_PROFILE)); \
	echo "Syncing to s3://$$BUCKET/piskel/ (profile: $(AWS_PROFILE))..."; \
	aws s3 sync dest/prod/ s3://$$BUCKET/piskel/ --delete --profile $(AWS_PROFILE)
