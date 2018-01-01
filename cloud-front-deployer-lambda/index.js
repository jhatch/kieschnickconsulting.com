'use strict';

const cloudFront = require("./src/aws/cloudFront");

/**
 * ToDo:
 *   - add email notification on failure/success
 *   - parameterize published vs preview + dev vs stag vs prod cloudfronts
*/
exports.handler = (event, context, callback) => {
  cloudFront.setEnv(event.env);
  cloudFront.updateOriginPath(event.buildName)
    .then(() => cloudFront.invalidateCache())
    .then(() => callback(null, "success"))
    .catch(callback);
};
