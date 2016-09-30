'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  seedDB: false,
  secrets: {
    session: 'sozizi-secret'
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  goodreads: {
    clientID: process.env.GOODREADS_ID || 'id',
    clientSecret: process.env.GOODREADS_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/goodreads/callback`
  }
};

module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
