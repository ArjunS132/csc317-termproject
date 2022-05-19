var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postmiddleware');
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('home');
});

router.get('/home',getRecentPosts, function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});


router.get('/index', getRecentPosts, function(req, res, next) {
  res.render('home');
});

router.use('/postimage', isLoggedIn);
router.get('/postimage', function(req, res, next) {
  res.render('postimage');
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost');
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req,res,next) => {
    res.render('viewpost', { title: `Post ${req.params.id}`});
});

module.exports = router;
