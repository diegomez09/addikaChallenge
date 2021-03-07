const jwt = require('jsonwebtoken');
// =========
// Verificar role
//==============

let create = (req, res, next) => {
    let token = req.query.token;
    let decoded = jwt.decode(token);
    let permissions = decoded.user.permissions;
    if (permissions == 'CREATE' || permissions == 'ADMIN') next();
    else res.status(422).json({
        succes: false,
        error: 'Access denied'
    })
}

let update = (req, res, next) => {
    let token = req.query.token;
    let decoded = jwt.decode(token);
    let permissions = decoded.user.permissions;
    if (permissions == 'UPDATE' || permissions == 'ADMIN') next();
    else res.status(422).json({
        succes: false,
        error: 'Access denied'
    })
}

let adminRole = (req, res, next) => {
    let role = req.query.role
    if (role == 'ADMIN') next();
    return res.status(422).json({
        succes: false,
        error: 'Access denied'
    })
}
module.exports = {
    create,
    update,
    adminRole
}