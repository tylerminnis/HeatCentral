const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isAuthor} = require('../middleware/auth');
const { validateId } = require('../middleware/validator');

const router = express.Router();

router.get('/', controller.index); // eventually need to come back in here and change it to /

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;