// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const { verifyToken } = require("../middleware/auth");
const { User } = require('../config/db');
const { check, validationResult } = require('express-validator');
const { adminRole } = require('../middleware/role');
// ===========================
// Initializations
// ===========================

/**
  * @api {POST} /user Create new user
  * @apiGroup User
  * @apiDescription This method adds a new user in the database
  * @apiVersion  1.0.0
  * @apiAuth Bearer Token {token}
  * 
  *  @apiParamExample  {type} Request-Example:
   {
   "role":"ADMIN",
   "email":"admin@mail.com",
   "password":"123456",
   "permissions":"ADMIN"
    }
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "succes": true,
    "data": {
        "role": "ADMIN",
        "email": "admin@mail.com",
        "password": ":D",
        "permissions":"ADMIN"
    }
    }
  */
router.post('/user', [
    verifyToken,
    adminRole,
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('permissions', 'Permissions is required').not().isEmpty()
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
 * @api {GET} /user Get All Users
 * @apiGroup User
 * @apiDescription This method returns all the users registered in the data base
 * @apiVersion  1.0.0
 * @apiAuth Bearer Token {token}
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
router.get('/user',
    verifyToken,
    adminRole,
    async (req, res) => {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        return res.status(200).json({
            succes: true,
            total: users.length,
            data: users
        });
    })

/**
  * @api {PUT} /user/{id} Update user
  * @apiGroup User
  * @apiDescription This method adds a new user in the database
  * @apiVersion  1.0.0
  * @apiAuth Bearer Token {token}
  * @apiParam  {String} id Id of the document to be updated
  * 
  *  @apiParamExample  {type} Request-Example:
   {
    "role":"admin",
    "email":"admin@mail.com",
    "permissions":"ADMIN"
}
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "success": true,
    "user": {
        "id": 1,
        "role": "admin",
        "email": "admin@mail.com",
        "permissions": "ADMIN",
        "createdAt": "2021-03-06T20:21:18.000Z",
        "updatedAt": "2021-03-06T23:09:10.000Z"
    }
}
  */
router.put("/user/:id",
    verifyToken,
    adminRole,
    async (req, res) => {
        await User.update(req.body, {
            where: { id: req.params.id }
        }).catch();
        const userUpdate = await User.findByPk(req.params.id, {
            where: { id: req.params.id },
            attributes: { exclude: ['password'] }
        });
        return res.status(200).json({
            success: true,
            user: userUpdate,
        });
    });

/**
   * @api {DELETE} /user/{id} Delete user
   * @apiGroup User
   * @apiDescription This method do a logical delete of the user from de database
   * @apiVersion  1.0.0
   * @apiAuth Bearer Token {token}
   * @apiParam  {String} id Id of the document to be deleted
   * @apiSuccessExample {type} Success-Response:
   * {
    "success": true,
    "user": {
        "id": 1,
        "role": "ADMIN",
        "email": "admin@mail.com",
        "permissions": "ADMIN",
        "createdAt": "2021-03-06T23:20:29.000Z",
        "updatedAt": "2021-03-06T23:20:29.000Z"
    }
}
   */
router.delete("/user/:id",
    verifyToken,
    adminRole,
    async (req, res) => {
        let id = req.params.id;
        const userUpdate = await User.findByPk(req.params.id, {
            where: { id: req.params.id },
            attributes: { exclude: ['password'] }
        });
        await User.destroy({
            where: { id: id }
        })
        return res.status(200).json({
            success: true,
            user: userUpdate
        });
    });
module.exports = router;