'use strict';

import express from 'express';
import {books, quotes} from './goodreads.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/books', books.search);
router.get('/quotes', auth.isAuthenticated(), quotes.search);
router.get('/quotes/:id', quotes.show);
router.post('/quotes/add', auth.isAuthenticated(), quotes.add);

module.exports = router;
