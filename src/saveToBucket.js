// Import the Amazon S3 service client
const S3 = require('aws-sdk/clients/s3');
 
// Set credentials and region
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-east-2'
});

var params = {
  Body: Buffer.from("Hi from aws-sdk!", 'utf8'), 
  Bucket: "kieschnickconsulting.com", 
  Key: "newGuy_" + Date.now(), 
  ServerSideEncryption: "AES256", 
  Tagging: "key1=value1&key2=value2"
};

module.exports = function (cb) {
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    cb();
  });
}