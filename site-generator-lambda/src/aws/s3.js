'use strict';

const async = require('async');
const fs = require('fs');
const path = require('path');
const S3 = require('aws-sdk/clients/s3');
 
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: process.env.AWS_REGION
});

const file2contentType = file => {
  let contentType;

  switch (file.substr(file.lastIndexOf(".") + 1)) {
    case "html":
      contentType = 'text/html';
      break;
    case "js":
      contentType = 'application/javascript';
      break;
    case "jpg":
      contentType = 'image/jpeg';
      break;
    case "css":
      contentType = 'text/css';
      break;
    case "json":
      contentType = 'application/json';
      break;
    default:
      contentType = 'application/octet-stream';
      break;
  }

  return contentType;
}

module.exports = {
  upload: (buildName, publicDir) => {
    console.log("Upload files to S3.");
    return new Promise((resolve, reject) => {
      console.log("Reading files from " + publicDir);
      const files = fs.readdirSync(publicDir);
      
      async.map(files.filter(file => file.includes(".")), function (f, cb) {
        const filePath = path.join(publicDir, f);

        console.log("Reading file " + filePath, f);
        const options = {
          Bucket: process.env.S3_BUCKET,
          Key: buildName + "/" + f,
          Body: fs.readFileSync(filePath),
          ContentType: file2contentType(filePath)
        };

        s3.putObject(options, cb);
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
