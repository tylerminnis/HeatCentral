const model = require('../models/event');
const user = require('../models/user');


exports.index = (req, res, next) => {
    model.find()
    .then(events=> {
        let sortedEvents = {};
        const categories = model.schema.path('category').enumValues;
        // const categories = model.category.;
        categories.forEach(category => {
            sortedEvents[category] = events.filter(event => event.category === category)
        });
    
        // for(const category in sortedEvents) {
        //     sortedEvents[category].sort((a, b) => a.start - b.start);
        // }
        res.render('./event/index', {user, events: sortedEvents})
    })
    .catch(err=>next(err));
    
};

exports.new = (req, res) => {
    res.render('./event/new');
};

exports.create = (req, res, next) => {
    const eventData = req.body; 
    // event.host = req.session.user;
    let event = {
        title: eventData.title, 
        host: req.session.user,
        category: eventData.category,
        start: eventData.start,
        end: eventData.end,
        location: eventData.location,
        details: eventData.details,
    };
    if (req.files) {
        const image = req.files.image;
        event.image = {
            data: image.data,
            filename: image.name,
            contentType: image.mimetype
        }
    }
    eventModel = new model(event);
    eventModel.save() // why is this not working
    .then(event=> {
        req.flash('success', 'Event was successfully created');
        res.redirect('/event');
    })
    .catch(err => {
        console.log(event)
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    })
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('host')
    .then(event=>{
        if(event) {
            res.render('./event/show', {user, events});
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        if(event) {
            res.render('./event/edit', {user, event});
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    
    console.log(req.params.user);
    // if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid event id ' + id);
    //     err.status = 404;
    //     return next(err);
    // }

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event => {
        if(event) {
            res.redirect('/event/' + id);
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
        err.status= 400;
        next(err)
    });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    // if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     let err = new Error('Invalid event id');
    //     err.status = 400;
    //     return next (err);
    // }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        if(event) {
            req.flash('success', 'Succsesfully deleted the event');
            res.redirect('/event/');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
        next(err);
        }
    })
    .catch(err=>next(err));
};