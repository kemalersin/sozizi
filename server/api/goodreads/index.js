'use strict';

import express from 'express';
import * as controller from './goodreads.controller';

var router = express.Router();

router.get('/search/:q', controller.show);

module.exports = router;
