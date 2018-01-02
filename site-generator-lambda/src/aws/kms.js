'use strict';

const KMS = require('aws-sdk/clients/kms');
const kms = new KMS({
  apiVersion: '2014-11-01',
  region: process.env.AWS_REGION
});

module.exports = {
  decrypt: encrypted => {
    return new Promise((resolve, reject) => {
      kms.decrypt({ CiphertextBlob: new Buffer(encrypted, 'base64') }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Plaintext.toString('utf8'));
        }
      });
    });
  }
};
