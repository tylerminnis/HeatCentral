const model = require('../models/user');
const Event = require('../models/event');
const modelRsvp = require('../models/rsvp');

exports.signup = (req, res)=> {
    return res.render('./user/signup')
};

exports.create = (req, res, next)=> {
    let user = new model(req.body);
    user.save()
    .then(user=> res.redirect('users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email has been used');
            return res.redirect('/users/signup');
        }
        next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.firstName = user.firstName;
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'Wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({host: id}), modelRsvp.find({user: id})])
    .then(results=>{

        const [user, events, rsvps] = results;
        let rsvpEvents = [];
        for (yes in rsvps) {
            if(rsvps[yes].status === 'YES' || rsvps[yes].status === 'MAYBE') {
                rsvpEvents.push(rsvps[yes].event)
            }
        }
        res.render('./user/profile', {user, events, rsvpEvents})
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
        return next(err);
        else 
            res.redirect('/');  
    });
};