var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});


router.get('/index', function(req, res, next) {
  res.render('home');
});

router.use('/postimage', isLoggedIn);
router.get('/postimage', function(req, res, next) {
  res.render('postimage');
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost');
});

module.exports = router;
