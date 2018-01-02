'use strict';

const contentful = require("./src/contentful");
const site = require("./src/site");
const s3 = require("./src/aws/s3");
const lambda = require("./src/aws/lambda");

const validateParams = event => {
  const env = event.env || event.headers['x-env'];
  const content = event.content || event.headers['x-content'];

  if (typeof env !== 'string' || typeof content !== 'string') { 
    throw new Error('Invalid event input for ENV and CONTENT');
  } else {
    return { env, content };
  }
};

exports.handler = (event, context, callback) => {
  const params = validateParams(event);
  const buildName = `build_${Date.now()}`;
  console.log(params);
  console.log(buildName);
  console.log(process.env.AWS_REGION);
  console.log(process.env.DOWNSTREAM_LAMBDA_FUNCTION);
  let cnt;
  contentful.getContent(params.content)
    .then(content => { cnt = content; return site.generate(buildName, content) })
    .then(html => s3.upload(buildName, html))
    .then(() => lambda.invokeCloudFrontDeployer(params.env, buildName))
    .then(() => callback(null, cnt))
    .catch(callback);
};
