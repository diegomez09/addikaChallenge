// ===========================
// Requires
// ===========================
const express = require('express')
const router = new express.Router();
const { verifyToken } = require("../middleware/auth");
const { Post, Log } = require('../config/db');
const { check, validationResult } = require('express-validator');
const { create, update } = require('../middleware/role');
const { Op } = require('sequelize');
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
            await log(req.user.id, req.method, post.id);
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
    async (req, res) => {
        let zeroDate = new Date(0, 0, 0).toISOString().slice(0, 19).replace('T', ' ');
        let now = Date.now();
        let from = req.query.from || 0;
        let limit = req.query.limit || null;
        let sortDate = req.query.sort || 'DESC';
        let startDate = req.query.startDate || new Date(0, 0, 0).toISOString().slice(0, 19).replace('T', ' ');
        let endDate = req.query.endDate || new Date(now).toISOString().slice(0, 19).replace('T', ' ');
        let week = new Date(now - 604800000).toISOString().slice(0, 19).replace('T', ' ');
        await Post.update(
            {
                week: true
            },
            {
                where: {
                    "createdAt": { [Op.between]: [zeroDate, week] }
                }
            });
        await Post.findAll({
            where: {
                "createdAt": { [Op.between]: [startDate, endDate] }
            },
            offset: from,
            limit: limit,
            order: [['createdAt', sortDate]]
            // include: [{
            //     model: Review,
            //     as: 'review',
            //     attributes: ['body', 'createdAt']
            // }]
        }).then((posts) => {
            return res.status(200).json({
                succes: true,
                total: posts.length,
                data: posts
            })
        }).catch((error) => res.status(404).json({
            succes: false,
            errorInfo: error
        }));
    })
/**
  * @api {PUT} /post/{id} Update post
  * @apiGroup Post
  * @apiDescription This method adds a new post in the database
  * @apiVersion  1.0.0
  * @apiParam  {String} id Id of the document to be updated
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
        "week": null,
        "createdAt": "2021-03-07T04:46:39.000Z",
        "updatedAt": "2021-03-07T04:55:20.000Z"
        }
    }
  */
router.put("/post/:id",
    verifyToken,
    update,
    async (req, res) => {
        await Post.update(req.body, {
            where: { id: req.params.id }
        });
        await log(req.user.id, req.method, req.params.id);
        await Post.findByPk(req.params.id, {
            where: { id: req.params.id }
        }).then((post) =>{
            return res.status(200).json({
                success: true,
                post: post,
            });
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
        "week":null,
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
        });
        await log(req.user.id, req.method, id);
        await Post.destroy({
            where: { id: id }
        });
        return res.status(200).json({
            success: true,
            post: postUpdate
        });
    });

// ===========================
//  Log data
// ===========================    
async function log(userId, method, idPost) {
    let log = {
        userId: userId,
        action: method,
        postId: idPost
    }
    await Log.create(log);
}
module.exports = router;