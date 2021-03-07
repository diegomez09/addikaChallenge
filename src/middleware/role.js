const jwt = require('jsonwebtoken');
// =========
// Verificar role
//==============

let create = (req, res, next) => {
    if (req.user.permissions != 'UPDATE') next();
}

let update = (req, res, next) => {
    if (req.user.permissions != 'CREATE') next();
}

let adminRole = (req, res, next) => {
    if (req.user.permissions == 'ADMIN') next();
}
module.exports = {
    create,
    update,
    adminRole
}