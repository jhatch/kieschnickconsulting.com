'use strict';

const contentful = require('contentful')
const client = contentful.createClient({
  space: 'l6kwo5y17oth',

  // TODO: we can't just hardcode this here...also invoke this key and make a new one
  accessToken: '38c295252cdb39fd30de25c452d2a85858afe31cc46342bf6db1ce705281d9bb'
});

module.exports = {
  getContent: () => {
    return client.getEntries();
  }
};
