// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const { verifyToken } = require("../middleware/auth");
const { User } = require('../config/db');
const { check, calidationResult, validationResult } = require('express-validator');
// ===========================
// Initializations
// ===========================

/**
  * @api {POST} /user?token={token} Create new user
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
        "password": ":D",
        "permissions":true
    }
    }
  */
router.post('/user', [
    //verifyToken,
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('permissions','Permissions is required')
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

/**
 * @api {GET} /user?token={token} Get All Users
 * @apiGroup User
 * @apiDescription This method returns all the users registered in the data base
 * @apiVersion  1.0.0
 * @apiParam  {String} token JWT
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "succes": true,
    "total": 1,
    "data": [
        {
            "id": 1,
            "role": "admin",
            "email": "admin@mail.com",
            "permissions":true
            "createdAt": "2021-03-06T19:19:41.000Z",
            "updatedAt": "2021-03-06T19:19:41.000Z"
        }
    ]
    }
 * 
 */
router.get('/user', [verifyToken], async (req, res) => {
    const users = await User.findAll({
        attributes:{
            exclude: ['password']
        }
    });
    return res.status(200).json({
        succes: true,
        total: users.length,
        data: users
    });
})
module.exports = router;