const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    // id is done by mongo
    title: {type: String, required: [true, 'title is required']},
    host: {type: String, required: [true, 'host is required']},
    category: {type: String, required: [true, 'category is required']},
    start: {type: Date, required: [true, 'start time is required']},
    end: {type: Date, required: [true, 'end time is required']},
    location: {type: String, required: [true, 'location is required']},
    details: {type: String, required: [true, 'details are required'],
    minLength: [10, 'the content must be at least 10 characters']}
    });

module.exports = mongoose.model('Event', eventSchema);
