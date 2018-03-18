'use strict';

const contentful = require('contentful')
const kms = require('./aws/kms');

module.exports = {
  getContent: content => {
    let rProm;

    console.log("Fetching content from Contentful.");
    switch (content) {
      case 'preview':
        rProm = kms.decrypt(process.env.CONTENTFUL_PREVIEW_API_KEY)
          .then(apiKey => {
            const client = contentful.createClient({
              space: process.env.CONTENTFUL_SPACE_ID,
              accessToken: apiKey,
              host: process.env.CONTENTFUL_PREVIEW_HOST
            });

            return client.getEntry('5otYFWLq6cCUOaCiCuuqci');
          });

        break;

      case 'publish':
        rProm = kms.decrypt(process.env.CONTENTFUL_PUBLISH_API_KEY)
          .then(apiKey => {
            const client = contentful.createClient({
              space: process.env.CONTENTFUL_SPACE_ID,
              accessToken: apiKey,
              host: process.env.CONTENTFUL_PUBLISHHOST
            });

            return client.getEntry('5otYFWLq6cCUOaCiCuuqci');
          });

        break;

      default:
        break;

    }

    return rProm;
  }
};
