'use strict';

module.exports = {
  generate: content => {
    return Promise.resolve(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <pre>${JSON.stringify(content, null, 2)}</pre>
      </body>
      </html>
    `);
  }
};
