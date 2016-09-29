'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('goodreads'))
  .get('/callback', passport.authenticate('goodreads', {
    failureRedirect: '/',
    session: false
  }), setTokenCookie);

export default router;
