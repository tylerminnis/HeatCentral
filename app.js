const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const {fileUpload} = require('./middleware/fileUpload');

const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
let uri = 'mongodb+srv://demo:demo123@cluster0.tuzf5i3.mongodb.net/?retryWrites=true&w=majority'
app.set('view engine', 'ejs');

mongoose.connect(uri)
.then(()=>{
    app.listen(port,host, () => {
        console.log('Server is running on port', port);
    })
})
.catch(err=>console.log(err.message));

// mount middleware
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
