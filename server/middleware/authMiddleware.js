const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMideleware = async(req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).send({ error: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user){
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'AUthentication failed'});
    }

};

module.exports = authMideleware;