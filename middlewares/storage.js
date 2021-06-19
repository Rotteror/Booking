const hotel = require('../services/hotel')

module.exports = () => (req, res, next) => {
    //TO DO import and decorate services 
    req.storage = {
        ...hotel,
    };

    next();
}