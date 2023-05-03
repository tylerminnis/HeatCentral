const {body} = require('express-validator');

exports.validateId = (req, res, next) => {
    const id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        console.log('This is the id:'+ id);
        return next(err);
    }
    next();
}

exports.validateSignUp = [body('firstName', 'first name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'last name cannot be empty').notEmpty().trim().escape(),
body('email', 'email is not valid').isEmail().trim().escape().normalizeEmail(),
body('password', 'password must be between 8-64 characters').isLength({min: 8, max: 64})]

exports.validateLogin = [body('email', 'email is not valid').isEmail().trim().escape().normalizeEmail(),
body('password', 'password must be between 8-64 characters').isLength({min: 8, max: 64})]

exports.validateEvent = [body('title', 'title cannot be empty').notEmpty().trim().escape(), body('content', 'content must be longer that 10 characters').isLength({min: 10}).trim().escape()]

let categories = ['Pick-up basketball', 'Watch Party', 'Hang out', 'NBA 2K', 'Other']
exports.validateCategory = [body('category', 'Category cannot be empty').isIn(categories)]

exports.validateStart = [body('start', 'start cannot be empty').notEmpty().isISO8601().isAfter(Date.now())]

exports.validateEnd = [body('end', 'End time must be after start time').notEmpty().isISO8601().custom((value, { req }) => new Date(value) > new Date(req.body.start)).trim().escape()]