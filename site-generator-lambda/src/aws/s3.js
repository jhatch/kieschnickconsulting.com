'use strict';

const S3 = require('aws-sdk/clients/s3');
 
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: process.env.AWS_REGION
});

module.exports = {
  upload: (buildName, html) => {
    return new Promise((resolve, reject) => {
      const params = {
        Body: Buffer.from(html, 'utf8'), 
        Bucket: process.env.S3_BUCKET, 
        Key: `${buildName}/index.html`, 
        ContentType: 'text/html'
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(buildName);
        }
      });
    });
  }
};
