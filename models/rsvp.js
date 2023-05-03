const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref:'User',required: [true, 'user is required']},
    event: {type: Schema.Types.ObjectId, ref:'Event', required: [true, 'event is required']},
    status: {type: String, required: [true, 'status is required'], 
    enum: ['YES', 'NO', 'MAYBE'] }, 

});

module.exports = mongoose.model('RSVP', rsvpSchema);
