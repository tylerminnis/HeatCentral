const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', mainRoutes)
app.use('/event', eventRoutes);


app.use((req, res, next) => {
    let err = new Error("Oops! We can't seem to find " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ('We messed something up on our end, sorry :(');
    }
    res.status(err.status);
    res.render('error', {error:err} )
});

app.listen(port, host, ()=> {
    console.log('Server is running on port ', port);
});
