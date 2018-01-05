'use strict';

const CloudFront = require('aws-sdk/clients/cloudfront');
 
const cloudFront = new CloudFront({
  apiVersion: '2017-03-25',
  region: 'us-east-2'
});

const distributionIds = {
  dev: process.env.DISTRIBUTION_DEV,
  staging: process.env.DISTRIBUTION_STAGING,
  prod: process.env.DISTRIBUTION_PROD
};

const envs = Object.keys(distributionIds);

let clientEnv;

module.exports = {

  setEnv: env => {
    if (!envs.includes(env)) {
      throw new Error("Invalid ENV provided");
    } else {
      clientEnv = env;
    }
  },

  updateOriginPath: buildName => {
    return new Promise((resolve, reject) => {
      if (typeof buildName !== "string" || buildName.trim().length === 0) {
        reject(new Error("Invalid BUILDNAME provided"));
      }

      cloudFront.getDistributionConfig({ Id: distributionIds[clientEnv] }, (err, config) => {
        if (err) {
          return reject(err);
        }

        config.DistributionConfig.Origins.Items[0].OriginPath = `/${buildName}`;
        
        cloudFront.updateDistribution({ 
          Id: distributionIds[clientEnv],
          IfMatch: config.ETag,
          DistributionConfig: config.DistributionConfig
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            setTimeout(() => {
              resolve();
            }, 1000); // HACK: let the dist propagate
            // TODO: poll for dist state instead of using this
          }
        });
      });
    });
  },

  invalidateCache: () => {
    var params = {
      DistributionId: distributionIds[clientEnv], 
      InvalidationBatch: { 
        CallerReference: '' + Date.now(),
        Paths: { 
          Quantity: 1,
          Items: ['/*']
        }
      }
    };

    return new Promise((resolve, reject) => {
      cloudFront.createInvalidation(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
