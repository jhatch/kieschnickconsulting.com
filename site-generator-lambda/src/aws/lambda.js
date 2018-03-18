'use strict';

const Lambda = require('aws-sdk/clients/lambda');
 
const lambda = new Lambda({
  apiVersion: '2015-03-31',
  region: process.env.AWS_REGION
});

module.exports = {
  invokeCloudFrontDeployer: (env, buildName) => {
    console.log("Invoking cloudfront deployer.");
    return new Promise((resolve, reject) => {
      lambda.invoke({
        InvocationType: 'Event',
        FunctionName: process.env.DOWNSTREAM_LAMBDA_FUNCTION,
        Payload: JSON.stringify({ env, buildName })
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