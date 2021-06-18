const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config/index')

const userService = require('../services/user');


function init() {
    return function (req, res, next) {
        req.auth = {
            async register(username, password) {
                const token = await register(username, password);
                res.cookies(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookies(COOKIE_NAME, token);
            },
            async logout() {
                res.clearCookie(COOKIE_NAME);
            },
        }

        next();
    };
}

async function register(username, password) {
    const existing = await userService.getUserByUsername(username);
    if (existing) {
        throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, hashedPassword);

    //TO DO login user after register and redirect to home page
    return generateToken(user);
}

async function login(username, password) {

    const user = await userService.getUserByUsername(username);
    if (!user) {
        throw new Error('No account with this username');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Invalid password');
    }

    //aply jwt -> User
    return generateToken(user);



};

function generateToken(userData) {
    const token = jwt.sign({
        _id: userData._id,
        username: userData.username,
    }, TOKEN_SECRET);
    return token;
}
