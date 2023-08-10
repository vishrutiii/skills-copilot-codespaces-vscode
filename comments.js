//create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var auth = require('../middlewares/auth');

//create comment
router.post('/', auth.ensureAuthenticated, function (req, res, next) {
    var comment = new Comment({
        content: req.body.content,
        post: req.body.post,
    }
    );
    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }
        res.status(201).json(comment);
    }   
    );
});
