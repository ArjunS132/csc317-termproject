var express = require('express');
var router = express.Router();
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
var db = require('../config/database');
const { route } = require('express/lib/application');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.password;
    UserModel.usernameExists(username)
    .then((usernameDoesExist) => {
        if(usernameDoesExist) {
             throw new UserError(
                 "Registration failed: Username already exists",
                 "/Registration",
                 200
             );
        } else {
            UserModel.emailExists(email);
        }
    })
    .then( (emailDoesExist) => {
        if(emailDoesExist) {
             throw new UserError(
                 "Registration failed: email already exists",
                 "/Registration",
                 200
             );
        } else {
            return UserModel.create(username, password, email);
        }
    })
    .then((createdUserId) => {
        if(createdUserId < 0) {
             throw new UserError(
                 "Server Error, user could not be created",
                 "/registration",
                 500
             );
        } else {
             successPrint("User.js -> User was created!!");
             req.flash('success', 'User account has been made');
             res.redirect('/login');
        }

    })
    .catch((err) => {
        errorPrint("user could not be made", err);
        if(err instanceof UserError){
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        } else {
            next(err);
        }
    });

});

// set up login to login if the user exists
router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    /*
     * do server side validation?
     */
    UserModel.authenticate(username, password)
    .then((loggedUserId) => {
        if(loggedUserId > 0) {
            successPrint(`User ${username} is logged in`)
            req.flash('success', 'You have been successfully Logged in!');
            req.session.username = username;
            req.session.userId = loggedUserId;
            res.locals.logged = true;
            res.redirect('/home');
        } else {
            throw new UserError("invalid username and/or password!", "/login", 200);
        }
    })
    .catch((err) => {
        errorPrint("user login failed");
        if(err instanceof UserError) {
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect('/login');
        } else {
            next(err);
        }
    })
});

// logout from the site
router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            errorPrint('Session could not be destroyed');
            next(err);
        } else {
            successPrint('Session was destroyed');
            res.clearCookie('csid');
            res.json({status:"OK", message:"user is logged out"});
        }
    })
})

module.exports = router;
