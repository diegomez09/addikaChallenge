const jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// =========
// Verificar token
//==============

let verifyToken = (req, res, next) => {
    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1]
    jwt.verify(token, SEED, (error, decoded) => {
        //Verify errors
        if (error) {
            return
        }
        req.user = decoded.user;
        next();
    });

}

module.exports = {
    verifyToken
}