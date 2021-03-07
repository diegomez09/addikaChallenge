// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const { verifyToken } = require("../middleware/auth");
const { Log } = require('../config/db');
const { check, validationResult } = require('express-validator');
const { adminRole } = require('../middleware/role');
const { Op } = require('sequelize');

/**
 * @api {GET} /post Get All Logs
 * @apiGroup Log
 * @apiDescription This method returns all the posts registered in the data base
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
            "userId": 1,
            "action": "PUT",
            "postId": 1,
            "createdAt": "2021-03-07T23:06:08.000Z",
            "updatedAt": "2021-03-07T23:06:08.000Z"
        }
    ]
}
 * 
 */
router.get('/log',
    verifyToken,
    adminRole,
    async (req, res) => {
        await Log.findAll({})
            .then((logs) => {
                return res.status(200).json({
                    succes: true,
                    total: logs.length,
                    data: logs
                });
            }).catch((err) => {
                return res.status(200).json({
                    succes: false,
                    total: 0,
                    error: err
                });
            })
    })

module.exports = router;