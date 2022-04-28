var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Arjun S. Gill" });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/postimage', function(req, res, next) {
  res.render('postimage');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost');
});

module.exports = router;
