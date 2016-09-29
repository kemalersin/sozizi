'use strict';
import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';

require('./goodreads/passport').setup(User, config);

var router = express.Router();

router.use('/goodreads', require('./goodreads').default);

export default router;
