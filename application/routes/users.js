var express = require('express');
var router = express.Router();
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
var db = require('../config/database');
const { route } = require('express/lib/application');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// set up registration to add user to the database
router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    /*
     * maybe move formValidation to here?
     */

    db.execute("SELECT * FROM users WHERE username=?", [username]).then(
        ([results, fields]) => {
        if( results && results.length == 0 ) {
            return db.execute("SELECT * FROM users WHERE email=?", [email]);
        }
        else {
            throw new UserError(
                "Registration failed: Username already exists",
                "/Registration",
                200
            );
        }
    })
    .then(([results, fields]) => {
        if( results && results.length == 0 ) {
            return bcrypt.hash(password,10);
        }
        else {
            throw new UserError(
                "Registration failed: email already exists",
                "/Registration",
                200
            );
        }
    })
    .then((hashedPassword) => {
        let baseSQL = "INSERT INTO users (username, email, password, createdAt) VALUES (?,?,?,now());"
        return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            successPrint("User.js -> User was created!!");
            res.redirect('/login');
        } else{
            throw new UserError(
                "Server Error, user could not be created",
                "/registration",
                500
            );
        }
    })
    .catch((err) => {
        errorPrint("user could not be made", err);
        if(err instanceof UserError){
            errorPrint(err.getMessage());
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
    let baseSQL="SELECT username, password FROM users WHERE username=?"
    db.execute(baseSQL,[ username ])
    .then(([results, fields]) => {
        if(results && results.length == 1) {
            let hashedPassword = results[0].password;
            return bcrypt.compare(password, hashedPassword);
        } else {
            throw new UserError("Invalid username and/or password!", "/login", 200);
        }
    })
    .then((matchingPasswords) => {
        if(matchingPasswords) {
            successPrint(`User ${username} is logged in`)
            res.locals.logged = true;
            res.render('home', {logged:true});
        } else {
            throw new UserError("invalid username and/or password!", "/login", 200);
        }
    })
    .catch((err) => {
        errorPrint("user login failed");
        if(err instanceof UserError) {
            errorPrint(err.getMessage());
            res.status(err.getStatus());
            res.redirect('/login');
        } else {
            next(err);
        }
    })
})

module.exports = router;



