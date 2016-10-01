'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'sozizi-secret',

  GOODREADS_ID: 'app-id',
  GOODREADS_SECRET: 'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  PRERENDER_TOKEN: 'token',
  MONGODB_URI: 'mongodb://localhost/sozizi',
};
