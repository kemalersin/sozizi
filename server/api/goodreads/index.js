'use strict';

import express from 'express';
import * as controller from './goodreads.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/search', controller.show);
router.post('/add-quote', auth.isAuthenticated(), controller.addQuote);

module.exports = router;
