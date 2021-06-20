function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

function isOwner() {
    return (req, res, next) => {
        if (req.data.hotel && req.user && (req.data.hotel.owner == req.user._id)) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}