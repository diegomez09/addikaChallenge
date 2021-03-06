// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const { User } = require('../config/db');
const { check, calidationResult, validationResult } = require('express-validator');
// ===========================
// Initializations
// ===========================

/**
  * @api {POST} /user Create new user
  * @apiGroup User
  * @apiDescription This method adds a new user in the database
  * @apiVersion  1.0.0
  * @apiParam  {String} token JWT
  * 
  *  @apiParamExample  {type} Request-Example:
   {
   "role":"admin",
   "email":"admin@mail.com",
   "password":"123456"
    }
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "succes": true,
    "data": {
        "role": "admin",
        "email": "admin@mail.com",
        "password": ":D"
    }
    }
  */
router.post('/user', [
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ error: errors.array() });
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    try {
        const user = await User.create(req.body);
        user.password = ":D";
        return res.status(200).json({
            succes: true,
            data: user
        });
    } catch (e) {
        return res.status(422).json({
            succes: false,
            error: e
        })
    }
})
module.exports = router;