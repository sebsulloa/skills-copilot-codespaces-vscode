// Create web server to handle comments requests
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Comment = require('../models/comment');
var mongoose = require('mongoose');

// Use body parser to parse body of request
router.use(bodyParser.json());

// Handle GET requests to /comments
router.route('/')
    // Get all comments from database
    .get(function(req, res, next) {
        Comment.find({}, function (err, comments) {
            if (err) throw err;
            res.json(comments);
        });
    })
    // Post a new comment to the database
    .post(function(req, res, next) {
        Comment.create(req.body, function (err, comment) {
            if (err) throw err;
            console.log('Comment created!');
            var id = comment._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the comment with id: ' + id);
        });
    })
    // Delete all comments from database
    .delete(function(req, res, next) {
        Comment.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

// Handle GET requests to /comments/:commentId
router.route('/:commentId')
    // Get a comment from the database by ID
    .get(function(req, res, next) {
        Comment.findById(req.params.commentId, function (err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })
    // Update a comment in the database by ID
    .put(function(req, res, next) {
        Comment.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, {
            new: true
        }, function (err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })
    // Delete a comment from the database by ID
    .delete(function(req, res, next) {
        Comment.findByIdAndRemove(req.params.commentId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

// Export router
module.exports = router;