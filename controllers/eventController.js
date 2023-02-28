const express = require ('express');
// const eventRouter = require('../routes/eventRoutes');
const model = require('../models/event');

exports.index = (req, res) => {
    let events = model.find();
    res.render('./index');
    res.render('./event/index', {events});
};

exports.new = (req, res) => {
    res.render('./event/new');
};

exports.events = (req, res) => {
    let event = model.find();
    res.render('./event/events', {event});
};

exports.create = (req, res) => {
    let event = req.body;
    model.save(event);
    res.redirect('./events');
};

exports.show = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/show', {event});
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    }
}

exports.update = (req, res) => {
    let event = req.body;
    let id = req.params.id;
    if(model.updateById(id, event)) {
        res.redirect('/event/' + id);
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    }
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/event');
    } else {
        let err = new Error('Cannot find event with id ' + id);
        err.status = 404;
        next(err);
    }
}