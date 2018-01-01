'use strict';

const Lambda = require('aws-sdk/clients/lambda');
 
const lambda = new Lambda({
  apiVersion: '2015-03-31',
  region: 'us-east-2'
});

module.exports = {
  invokeCloudFrontDeployer: (env, buildName) => {
    return new Promise((resolve, reject) => {
      lambda.invoke({
        InvocationType: 'Event',
        FunctionName: 'CloudFrontDeployer',
        Payload: JSON.stringify({ env: env, buildName: buildName })
      }, err => {
        if (err) {
          reject(err);
        } else {
          resolve(buildName);
        }
      });
    });
  }
};