'use strict';

import express from 'express';
import {books, quotes} from './goodreads.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/books', books.search);
router.get('/archive/:id', quotes.search);
router.get('/archive', auth.isAuthenticated(), quotes.search);
router.get('/quotes/:id', quotes.read);
router.post('/quotes', auth.isAuthenticated(), quotes.create);
router.delete('/quotes/:id', auth.isAuthenticated(), quotes.destroy);

module.exports = router;
