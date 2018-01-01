// Import the Amazon S3 service client
const S3 = require('aws-sdk/clients/s3');
 
// Set credentials and region
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-east-2'
});

module.exports = {
  upload: html => {
    return new Promise((resolve, reject) => {
      const params = {
        Body: Buffer.from(html, 'utf8'), 
        Bucket: "kieschnickconsulting.com", 
        Key: `build_${Date.now()}/example.html`, 
        ServerSideEncryption: "AES256"
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};
