
var db = require('../config/database');

const PostModel = {}

PostModel.create = (title, description, photoPath, thumbnailPath, fk_userId) => {
    let baseSQL = "INSERT INTO posts (title, description, photopath, thumbnailpath, createdAt, fk_userId) VALUE (?, ?, ?, ?, now(), ?);";
    return db.execute(baseSQL,[
        title,
        description,
        photoPath,
        thumbnailPath,
        fk_userId,
    ])
    .then( ([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
}

PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, description, thumbnailpath, concat_ws(' ', title, description) \
                   AS haystack \
                   FROM posts \
                   HAVING haystack like ?;";
    let sqlReadySearchTerm = '%' + searchTerm + '%';
        return db.execute(baseSQL, [sqlReadySearchTerm])
        .then( ([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

PostModel.getRecentPosts = (numberOfPosts) => {
    let baseSQL = `SELECT id, title, description, thumbnailpath, createdAt FROM posts ORDER BY createdAt DESC LIMIT ${numberOfPosts}`;
    return db.execute(baseSQL, [numberOfPosts])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch( (err) => Promise.reject(err));
}

module.exports = PostModel;
