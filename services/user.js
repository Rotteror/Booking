const User = require('../models/User');

async function createUser(username, hashedPassword) {

    const user = new User({
        username,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const patter = new RegExp(`^${username}$`, 'i' );
    const user = await User.findOne({$regex: pattern});

    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}