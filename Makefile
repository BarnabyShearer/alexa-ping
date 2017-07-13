STACK=alexa-ping
BUCKET=alexa-ping-code

.PHONY: deploy
deploy: packaged-template.yaml
	aws --profile ziis cloudformation deploy --region eu-west-1 --template-file packaged-template.yaml --stack-name $(STACK) --capabilities CAPABILITY_IAM

packaged-template.yaml: template.yaml index.js package.json
	aws --profile ziis cloudformation package --template-file template.yaml --s3-bucket $(BUCKET) --output-template-file "$@"

.PHONY: clean
clean:
	-rm packaged-template.yaml
