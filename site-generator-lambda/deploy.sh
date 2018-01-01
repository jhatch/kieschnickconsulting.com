set -e

functionName=KieschnickConsultingSiteGenerator
artifact="${functionName}_$(date +%Y%m%d-%H%M%S).zip"

echo "Uploading code to [lambda] ${functionName}..."

zip -rq $artifact ./*
export AWS_DEFAULT_REGION=us-east-2
export AWS_DEFAULT_OUTPUT=json
aws lambda update-function-code --function-name $functionName --zip-file fileb://$artifact
rm -rf $artifact

echo "Successfully deployed $artifact to $functionName"
