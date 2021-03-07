const jwt = require('jsonwebtoken');
// =========
// Verificar role
//==============

let create = (req, res, next) => {
    if (req.user.permissions != 'UPDATE') next();
    else res.status(403).json({
        success: false,
        message: "Invalid access"
    });
}

let update = (req, res, next) => {
    if (req.user.permissions != 'CREATE') next();
    else res.status(403).json({
        success: false,
        message: "Invalid access"
    });
}

let adminRole = (req, res, next) => {
    if (req.user.permissions == 'ADMIN') next();
    else res.status(403).json({
        success: false,
        message: "Invalid access"
    });
}
module.exports = {
    create,
    update,
    adminRole
}