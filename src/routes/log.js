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