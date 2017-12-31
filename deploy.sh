# exit on failure
set -e

# zip all contents
functionName=KieschnickConsultingSiteGenerator
artifact="${functionName}_$(date +%Y%m%d-%H%M%S).zip"
zip -r $artifact ./*

# use aws-cli to push up to lambda
export AWS_DEFAULT_REGION=us-east-2
export AWS_DEFAULT_OUTPUT=json
aws lambda update-function-code --function-name $functionName --zip-file fileb://$artifact
rm -rf $artifact

echo "Successfully deployed $artifact to $functionName"
