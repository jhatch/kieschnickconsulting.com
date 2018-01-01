'use strict';

module.exports = {
  generate: buildName => Promise.resolve(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <h1>Latest published content:</h1>
      <pre>${buildName}</pre>
    </body>
    </html>
  `)
};
