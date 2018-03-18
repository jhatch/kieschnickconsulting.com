set -e

functionName=KieschnickConsultingSiteGenerator
artifact="${functionName}_$(date +%Y%m%d-%H%M%S).zip"
staticSite=gatsby-static-site

echo "Generating build => ${artifact}..."
cp -r ../$staticSite ./$staticSite
zip -rq $artifact ./*
du -sh $artifact
rm -rf $staticSite

echo "Uploading ${artifact} to aws::s3::${functionName}Builds..."
export AWS_DEFAULT_REGION=us-east-2
export AWS_DEFAULT_OUTPUT=json

echo "Updating aws::s3::kieschnickconsultingcode"
aws s3 cp $artifact s3://kieschnickconsultingcode/
rm -rf $artifact $staticSite

echo "Updating aws::lambda::${functionName}"
aws lambda update-function-code --function-name $functionName --s3-bucket kieschnickconsultingcode --s3-key $artifact

echo "Successfully deployed $artifact to $functionName"
