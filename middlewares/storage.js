const hotel = require('../services/hotel')
const user = require('../services/user')

module.exports = () => (req, res, next) => {
    //TO DO import and decorate services 
    req.storage = {
        ...hotel,
        ...user
    };

    next();
}