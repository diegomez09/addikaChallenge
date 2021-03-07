// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const { verifyToken } = require("../middleware/auth");
const { Post } = require('../config/db');
const { check, validationResult } = require('express-validator');
const { create, update } = require('../middleware/role');
// ===========================
// Initializations
// ===========================

/**
  * @api {POST} /post?token={token}&role={role} Create new post
  * @apiGroup Post
  * @apiDescription This method adds a new post in the database
  * @apiVersion  1.0.0
  * @apiParam  {String} token JWT
  * @apiParam  {String} role string
  * 
  *  @apiParamExample  {type} Request-Example:
   {
   "role":"admin",
   "title":"admin@mail.com",
   "author":"123456",
   "permissions":"ALL"
    }
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "succes": true,
    "data": {
        "role": "admin",
        "title": "admin@mail.com",
        "author": ":D",
        "permissions":"ALL"
    }
    }
  */
router.post('/post', verifyToken, create, async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(200).json({
            succes: true,
            data: post
        });
    } catch (e) {
        return res.status(422).json({
            succes: false,
            error: e
        })
    }
})

/**
 * @api {GET} /post?token={token}&role={role} Get All Users
 * @apiGroup Post
 * @apiDescription This method returns all the posts registered in the data base
 * @apiVersion  1.0.0
 * @apiParam  {String} token JWT
 * @apiParam  {String} role string
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "succes": true,
    "total": 1,
    "data": [
        {
            "id": 1,
            "role": "admin",
            "title": "admin@mail.com",
            "permissions":true
            "createdAt": "2021-03-06T19:19:41.000Z",
            "updatedAt": "2021-03-06T19:19:41.000Z"
        }
    ]
    }
 * 
 */
router.get('/post',
    // [verifyToken], 
    async (req, res) => {
        const posts = await Post.findAll({});
        return res.status(200).json({
            succes: true,
            total: posts.length,
            data: posts
        });
    })

/**
  * @api {PUT} /post/{id}?token={token}&role={role} Update post
  * @apiGroup Post
  * @apiDescription This method adds a new post in the database
  * @apiVersion  1.0.0
  * @apiParam  {String} id Id of the document to be updated
  * @apiParam  {String} token JWT
  * @apiParam  {String} role string
  * 
  *  @apiParamExample  {type} Request-Example:
   {
    "role":"admin",
    "title":"admin@mail.com",
    "permissions":"ALL"
}
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "success": true,
    "post": {
        "id": 1,
        "role": "admin",
        "title": "admin@mail.com",
        "permissions": "ALL",
        "createdAt": "2021-03-06T20:21:18.000Z",
        "updatedAt": "2021-03-06T23:09:10.000Z"
    }
}
  */
router.put("/post/:id",
    // [verifyToken],
    async (req, res) => {
        const post = await Post.update(req.body, {
            where: { id: req.params.id }
        }).catch();
        const postUpdate = await Post.findByPk(req.params.id, {
            where: { id: req.params.id }
        });
        return res.status(200).json({
            success: true,
            post: postUpdate,
        });
    });

/**
   * @api {DELETE} /post/{id}?token={token}&role{role} Delete post
   * @apiGroup Post
   * @apiDescription This method do a logical delete of the post from de database
   * @apiVersion  1.0.0
   * @apiParam  {String} id Id of the document to be deleted
   * @apiParam  {String} token JWT
   * @apiParam  {String} role string
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
    "success": true,
    "post": {
        "id": 1,
        "role": "ADMIN",
        "title": "admin@mail.com",
        "permissions": "ALL",
        "createdAt": "2021-03-06T23:20:29.000Z",
        "updatedAt": "2021-03-06T23:20:29.000Z"
    }
}
   */
router.delete("/post/:id",
//  [verifyToken], 
 async (req, res) => {
    let id = req.params.id;
    const postUpdate = await Post.findByPk(req.params.id, {
        where: { id: req.params.id },
        attributes: { exclude: ['author'] }
    });
    await Post.destroy({
        where: { id: id }
    })
    return res.status(200).json({
        success: true,
        post: postUpdate
    });
});
module.exports = router;