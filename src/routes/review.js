// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const { verifyToken } = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const { create, update } = require('../middleware/role');
const { Op } = require('sequelize');
const {Review} = require('../config/db');

router.post('/review', async (req, res) => {
    const review = await Review.create(req.body)
        .catch((error) => {
            res.status(400).json({
                succes: false,
                errorInfo: error
            });
        });
    return res.status(200).json({
        succes: true,
        data: review
    });
})

module.exports = router;