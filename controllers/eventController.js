const model = require('../models/event');
const user = require('../models/user');
const modelRsvp = require('../models/rsvp');

exports.index = (req, res, next) => {
    model.find()
    .then(events=> {
        let sortedEvents = {};
        const categories = model.schema.path('category').enumValues;
        categories.forEach(category => {
            sortedEvents[category] = events.filter(event => event.category === category)
        });
        res.render('./event/index', {events: sortedEvents})
    })
    .catch(err=>next(err));
    
};

exports.new = (req, res) => {
    res.render('./event/new');
};

exports.create = (req, res, next) => {
    const eventData = req.body; 
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
    eventModel.save() 
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
    // const rsvpCount = modelRsvp.countDocuments({status: 'YES'}).count().exec();
    // const count = modelRsvp.find().where('status').all('YES').countDocuments();


    model.findById(id).populate('host')
    .then(event=>{
        
        if(event) {
            res.render('./event/show', {event});
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
            const startDay = new Date(event.start);
            const endDay = new Date(event.end);
            const startTime = startDay.toISOString().slice(0, 16);
			const endTime = endDay.toISOString().slice(0, 16);
            res.render('./event/edit', {user, event, startTime, endTime});
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

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event => {
        if(event) {
            req.flash('success', 'Succsesfully edited the event');
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
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        if(event) {
            req.flash('success', 'Succsesfully deleted the event');
            res.redirect('/event/');
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
        next(err);
        }
    })
    .catch(err=>next(err));
};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;
    const filter = {event: req.params.id, user: res.locals.user };
    const update = { status: req.body.RSVP }
    modelRsvp.findOneAndUpdate(filter,update,{
        upsert: true,
        new: true
    })
    .then(event=>{
        if(event) {
            req.flash('success', 'Sucessfully updated reservation');
            res.redirect('/event/' + id)
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
        }
    })
    .catch(err=> next(err));
};

// don't know why you would need
exports.getRsvp = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndUpdate(id)
    .then(event=>{
        
    })
    .catch(err=> next(err));
};