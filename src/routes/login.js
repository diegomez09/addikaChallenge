var express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = new express.Router();
const { User } = require('../config/db');
const TOKEN_EXP_TIME = require("../config/config").TOKEN_EXP_TIME;
const SEED = require("../config/config").SEED;

/**
 * @api {POST} /login Basic Login 
 * @apiName  Basic Authentication
 * @apiGroup Login
 * @apiDescription This methods allows a user to get a new JWToken
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiParamExample  {type} Request-Example:
    {
        "email":"admin@mail.com",
        "password":"123456"
    }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
        "success": true,
        "user": {
            "id": 1,
            "role": "admin",
            "email": "admin@mail.com",
            "password": ":D",
            "createdAt": "2021-03-06T19:19:41.000Z",
            "updatedAt": "2021-03-06T19:19:41.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImxvZ2luX3R5cGUiOiJiYXNpYyIsInN0YXR1cyI6IkEiLCJfaWQiOiI1ZjJjMGI1ZjkyMzA5MjEyMzRhOGIyMGEiLCJuYW1lIjoiRGVmYXVsdCBVc2VyIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInBhc3N3b3JkIjoiOkQiLCJnZW5kZXIiOiJNYWxlIiwiYmlydGhkYXkiOiIxOTk0LTAyLTAyIiwicm9sZSI6eyJzdGF0dXMiOiJBIiwiX2lkIjoiNWYyYzBhMGJlOThmODA3ZTc4YjE1ZjE3IiwibmFtZSI6IkRFRkFVTFRfUk9MRSJ9LCJtb2JpbGUiOm51bGwsInBob25lIjpudWxsLCJfX3YiOjAsImxhc3RfYWNjZXNzIjoiMjAyMC0wOC0wNlQxMzo1NToyMC4xMTVaIn0sImlhdCI6MTU5NjcyMzk3NywiZXhwIjoxNTk2NzM0Nzc3fQ.ds6nbeiqGPQRTl_a3kBwTyhiSx-DCjnx-prpTcPcVJE",
        "expireIn":"524824842848"
    }
 * 
 * 
 */
router.post("/login", async (req, res) => {
    var body = req.body;
    const user = await User.findOne({
        where: { email: body.email }
    });
    if (user == null) {
        return res.status(400).json({
            success: false,
            message: "Incorrect credentials",
        });
    }

    //Verify password
    try {
        if (!bcrypt.compareSync(body.password, user.dataValues.password)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error on read info sent",
            error,
        });
    }

    user.password = ":D";
    var token = generateToken(user);
    let expireIn = new Date();
    expireIn = expireIn.getTime() + TOKEN_EXP_TIME * 1000;

    return res.status(200).json({
        success: true,
        user,
        id: user.id,
        token,
        expireIn
    });
});

// ===========================
//  Generate system token
// ===========================
function generateToken(user) {
    return jwt.sign({ user }, SEED, { expiresIn: TOKEN_EXP_TIME });
}

module.exports = router;