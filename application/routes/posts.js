var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');
var PostModel = require('../models/Posts');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userId = req.session.userId;

    /*
     * server validation (foreign key, title, description)
     * error:
     * BIND parameters cannot be undefined
     */

    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then( () => {
        return PostModel.create(
            title,
            desc,
            fileUploaded,
            destinationOfThumbnail,
            fk_userId,
        );
    })
    .then( (postWasCreated) => {
        if(postWasCreated) {
            req.flash('success', 'Your post was created successfully!');
            res.redirect('/');
        } else{
            throw new PostError('Post could not be creasted', 'postImage', 200);
        }
    })
    .catch( (err) => {
        if(err instanceof PostError){
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }else{
            next(err)
        }
    });
});

router.get('/search', async (req, res, next) => {
    let searchTerm = req.query.search;
    if(!searchTerm) {
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    } else{
        let results = await PostModel.search(searchTerm);
        if(results.length) {
            res.send({
                message: `${results.length} results found`,
                results: results
            });
        } else {
            let results = await PostModel.getRecentPosts(8);
            res.send({
                resultsStatus: "info",
                message: "No results were found for your search, but here are the 8 most recent posts",
                results: results
            });
        }
    }
})

module.exports = router;
