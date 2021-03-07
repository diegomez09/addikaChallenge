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
  * @api {POST} /post Create new post
  * @apiGroup Post
  * @apiDescription This method adds a new post in the database
  * @apiVersion  1.0.0
  * 
  *  @apiParamExample  {type} Request-Example:
   {
    "title":"Titulolo",
    "author":"Diego",
    "body":"UN resumen"
}
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "succes": true,
    "data": {
        "id": 2,
        "title": "Titulolo",
        "author": "Diego",
        "body": "UN resumen",
        "updatedAt": "2021-03-07T02:26:52.128Z",
        "createdAt": "2021-03-07T02:26:52.128Z"
    }
    }
  */
router.post('/post',
    verifyToken,
    create,
    async (req, res) => {
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
 * @api {GET} /post Get All Posts
 * @apiGroup Post
 * @apiDescription This method returns all the posts registered in the data base
 * @apiVersion  1.0.0
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "succes": true,
    "total": 1,
    "data": [
        {
            "id": 1,
            "title": "Titulolo",
            "author": "Diego",
            "body": "UN resumen",
            "review": null,
            "createdAt": "2021-03-07T02:04:51.000Z",
            "updatedAt": "2021-03-07T02:04:51.000Z"
        }
    ]
    }
 * 
 */
router.get('/post',
    create,
    async (req, res) => {
        const posts = await Post.findAll({});
        return res.status(200).json({
            succes: true,
            total: posts.length,
            data: posts
        });
    })

/**
  * @api {PUT} /post/{id} Update post
  * @apiGroup Post
  * @apiDescription This method adds a new post in the database
  * @apiVersion  1.0.0
  * @apiParam  {String} id Id of the document to be updated
  * @apiParam  {String} token JWT
  * @apiParam  {String} role string
  * 
  *  @apiParamExample  {type} Request-Example:
   {
    "title": "Titulolo",
    "author": "1",
    "body": "UN resumen"
    }
  *
  * @apiSuccessExample {type} Success-Response:
  * {
    "success": true,
    "post": {
        "id": 1,
        "title": "Titulolo",
        "author": "Diegsdoss",
        "body": "UN resumen",
        "review": null,
        "createdAt": "2021-03-07T02:04:51.000Z",
        "updatedAt": "2021-03-07T02:37:51.000Z"
    }
    }
  */
router.put("/post/:id",
    verifyToken,
    update,
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
   * @api {DELETE} /post/{id} Delete post
   * @apiGroup Post
   * @apiDescription This method do a logical delete of the post from de database
   * @apiVersion  1.0.0
   * @apiParam  {String} id Id of the document to be deleted
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
    "success": true,
    "post": {
        "id": 1,
        "title": "Titulolo",
        "body": "UN resumen",
        "review": null,
        "createdAt": "2021-03-07T02:38:20.000Z",
        "updatedAt": "2021-03-07T02:38:20.000Z"
    }
    }
   */
router.delete("/post/:id",
    verifyToken,
    create,
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