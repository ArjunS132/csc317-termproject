var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');


router.post('/createPost', (req, res, next) => {
    console.log(req);
    res.send(``);
});
