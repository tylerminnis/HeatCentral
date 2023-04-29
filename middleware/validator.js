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