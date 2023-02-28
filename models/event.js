const { DateTime } = require('luxon');
const {v4: uuidv4 } = require('uuid');
const events = [
    // 3 events per catergory, at least 2 categories
{
    id: '1',
    title: 'Miami Heat vs. Charlotte Hornets Watch Party', 
    category: 'Watch Party',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    location: '9201 University City Blvd, Charlotte NC, 28223',
    details: "BYOB! Come and hang out and watch the Heat demolish (hopefully) the Hornets. Food will be provided but you're more than welcome to bring more! Questions? Contact me at (704)-687-1194"
},
{
    id: '2',
    title: 'Pick-up at Tamiami', 
    category: 'Pick-up basketball',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    host: 'Jimmy G. Buckets',
    location: '11210 SW 24th St',
    details: "Bring a friend! I got a couple guys that wanna play some pick-up at the park."
},
{
    id: '3',
    title: 'Miami Heat vs. Boston Celtics Watch Party', 
    category: 'Watch Party',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    host: 'Burnie',
    location: '601 Biscayne Boulevard',
    details: "Drinks provided! We are doing a watch party so we can suffer together against the Celtics. I have no hope for winning but at least we'll have a good time."
},
{
    id: '4',
    title: 'Miami Heat vs. New York Knicks', 
    category: 'Watch Party',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    host: 'StrusFan 2.0',
    location: '36th Street',
    details: "We're suffering through the most miserable season probably since Wade left. Come make it better by hanging out. If it gets too bad, I'm putting on Dolphins highlights."
},
{
    id: '5',
    title: 'Pick-up at UREC', 
    category: 'Pick-up basketball',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    host: 'Norm Niner',
    location: 'UREC',
    details: "Just failed a midterm and need to play some ball to make me feel better. HMU"
},
{
    id: '6',
    title: 'Pick-up at my house', 
    category: 'Pick-up basketball',
    start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    host: 'ChatGPT',
    location: 'Contact me',
    details: "Car broken so would love for someone to come over to play with me"
}, 
];

exports.find = function() {
    return events;
};

exports.findById = id = function(id) {
    return events.find(event=>event.id === id);
};

exports.save = function(event) {
    event.id = uuidv4();
    event.date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
}

exports.updateById = function(id, newEvent) {
    let event = events.find(event => event.id === id);
    if (event) {
        event.title = newEvent.title;
        event.details = newEvent.details;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}