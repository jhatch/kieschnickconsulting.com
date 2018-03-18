'use strict';

const exec = require('child_process').exec;

module.exports = {
  generate: (buildName, content) => {
    return new Promise((resolve, reject) => {
      exec('cp -r ./gatsby-static-site /tmp/gatsby-static-site && cd /tmp/gatsby-static-site && ./node_modules/.bin/gatsby build', err => {
        if (err) {
          console.error("SITE GEN FAILED", err);
          reject(err);
        } else {
          resolve('/tmp/gatsby-static-site/public');
        }
      });
    });
  }
}
