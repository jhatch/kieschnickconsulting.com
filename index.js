'use strict';

const request = require("request");
const saveToBucket = require("./src/saveToBucket");

exports.handler = (event, context, callback) => {
    request("http://google.com", () => {
      saveToBucket(() => {
        callback(null, {
          statusCode: 201
        });
      });
    })
};
