exports.index = (req, res) => {
    res.render('./');
};

exports.login = (req, res) => {
    res.render('./login');
}

exports.signup = (req, res) => {
    res.render('./signup');
}

exports.contact = (req, res) => {
    res.render('./contact');
}

exports.about = (req, res) => {
    res.render('./about');
}