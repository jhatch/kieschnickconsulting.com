'use strict';

const async = require('async');
const fs = require('fs');
const path = require('path');
const S3 = require('aws-sdk/clients/s3');
 
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: process.env.AWS_REGION
});

module.exports = {
  upload: (buildName, publicDir) => {
    console.log("Upload files to S3.");
    return new Promise((resolve, reject) => {
      console.log("Reading files from " + publicDir);
      const files = fs.readdirSync(publicDir);
      
      async.map(files.filter(file => file.includes(".")), function (f, cb) {
        const filePath = path.join(publicDir, f);

        console.log("Pushing file " + filePath, f);
        const options = {
          Bucket: process.env.S3_BUCKET,
          Key: buildName,
          Body: fs.readFileSync(filePath)
        };

        S3.putObject(options, cb);
      }, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};
