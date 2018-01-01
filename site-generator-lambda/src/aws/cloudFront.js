'use strict';

const CloudFront = require('aws-sdk/clients/cloudfront');
 
const cloudFront = new CloudFront({
  apiVersion: '2017-03-25',
  region: 'us-east-2'
});

module.exports = {
  updateOriginPath: buildName => {
    return new Promise((resolve, reject) => {
      cloudFront.getDistributionConfig({ Id: 'E1IRXV8VRR8TCH' }, (err, config) => {
        if (err) {
          return reject(err);
        }

        config.DistributionConfig.Origins.Items[0].OriginPath = `/${buildName}`;
        
        cloudFront.updateDistribution({ 
          Id: 'E1IRXV8VRR8TCH',
          IfMatch: config.ETag,
          DistributionConfig: config.DistributionConfig
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            setTimeout(() => {
              resolve();
            }, 30000);
          }
        });
      });
    });
  },

  invalidateCache: () => {
    var params = {
      DistributionId: 'E1IRXV8VRR8TCH', 
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
