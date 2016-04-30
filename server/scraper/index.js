'use strict';
import {Router} from 'express';

var controller = require('./scraper.controller');
var router = new Router();

router.get('/', controller.run);

module.exports = router;
