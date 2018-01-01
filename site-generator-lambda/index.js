'use strict';

const contentful = require("./src/contentful");
const site = require("./src/site");
const s3 = require("./src/aws/s3");
const cloudFront = require("./src/aws/cloudFront");

/**
 * ToDo:
 *   - add email notification on failure/success
 *   - parameterize published vs preview + dev vs stag vs prod cloudfronts
*/
exports.handler = (event, context, callback) => {
  contentful.getContent("published")
    .then(content => site.generate(content))
    .then(html => s3.upload(html))
    .then(buildName => cloudFront.updateOriginPath(buildName))
    .then(() => cloudFront.invalidateCache());
};
