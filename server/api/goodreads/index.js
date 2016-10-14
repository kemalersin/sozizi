'use strict';

import express from 'express';
import {books, quotes} from './goodreads.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/books', books.search);
router.get('/archive/:id', quotes.search);
router.get('/archive', auth.isAuthenticated(), quotes.search);
router.get('/quotes/:id', quotes.show);
router.post('/quotes/add', auth.isAuthenticated(), quotes.add);
router.post('/quotes/delete', auth.isAuthenticated(), quotes.delete);

module.exports = router;
