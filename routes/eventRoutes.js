// const { application } = require('express');
const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.get('/event', controller.index);

router.get('/events', controller.events)

router.get('/new', controller.new);

router.post('/create', controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.put('/:id', controller.delete);

module.exports = router;