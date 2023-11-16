const limit = require('express-rate-limit');

exports.loginLimiter = limit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        let err = new Error('Too many requests, try again later');
        err.status = 429;
        return next(err);
    }
})