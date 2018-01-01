'use strict';

const S3 = require('aws-sdk/clients/s3');
 
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-east-2'
});

module.exports = {
  upload: html => {
    return new Promise((resolve, reject) => {
      const buildName = `build_${Date.now()}`;
      const params = {
        Body: Buffer.from(html, 'utf8'), 
        Bucket: 'kieschnickconsulting.com', 
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
