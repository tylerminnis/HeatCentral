// const { application } = require('express');
const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.get('/', controller.index);

// router.get('/login', controller.login);

// router.get('/signup', controller.signup);

router.get('/contact', controller.contact);

router.get('/about', controller.about);

module.exports = router;