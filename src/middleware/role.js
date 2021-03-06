// =========
// Verificar role
//==============

let verifyRole = (req,res,next)=>{
    let role = req.query.role
    if(role==='ADMIN') next();
}
module.exports = {
    verifyRole
}