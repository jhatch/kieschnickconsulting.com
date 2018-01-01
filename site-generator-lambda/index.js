'use strict';

const contentful = require("./src/contentful");
const site = require("./src/site");
const s3 = require("./src/aws/s3");
const lambda = require("./src/aws/lambda");

exports.handler = (event, context, callback) => {
  const buildName = `build_${Date.now()}`;

  contentful.getContent("published")
    .then(content => site.generate(buildName))
    .then(html => s3.upload(buildName, html))
    .then(() => lambda.invokeCloudFrontDeployer('prod', buildName))
    .then(() => callback(null, buildName))
    .catch(callback);
};
