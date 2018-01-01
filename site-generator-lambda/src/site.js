'use strict';

module.exports = {
  generate: content => Promise.resolve(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <h1>Latest published content:</h1>
      <pre>${Date.now()}</pre>
    </body>
    </html>
  `)
};

// JSON.stringify(content, null, 2)