'use strict';

import express from 'express';
import * as controller from './goodreads.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/search', controller.search);
router.get('/quotes/:id', controller.show);
router.post('/quotes/add', auth.isAuthenticated(), controller.add);

module.exports = router;
