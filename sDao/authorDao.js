const db = require("../oDao/db");

const write = (query, parameters) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction(transactionError => {
            if (transactionError) return reject(transactionError);
            db.query(query, parameters, (queryError, result) => {
                if (queryError) {
                    db.rollback();
                    return reject(queryError);
                }
                db.commit();
                return resolve(result);
            });
        });
    });
};


exports.create = (author) => {
    const sql = "INSERT INTO tbl_author (authorName) " +
    "VALUES(?)";
    const parameters = [author.authorName];
    return write(sql, parameters);
};

exports.read = (authorId) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_author WHERE authorId = ?;';
        db.query(sql,authorId,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.readBooksByAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT tbl_book.bookId, title from tbl_book\n'+
        'INNER JOIN tbl_book_authors\n'+
        'ON tbl_book_authors.bookId = tbl_book.bookId\n'+
        'WHERE authorId = ?;';
        db.query(sql,authorId,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};



exports.readAll = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_author;';
        db.query(sql,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.update = (author) => {
    const sql = "UPDATE tbl_author SET authorName = ? WHERE authorId = ?";
    const parameters = [author.authorName, author.authorId];
    return write(sql, parameters);
};

exports.delete = (authorId) => {
    const sql = "DELETE FROM tbl_author WHERE authorId = ?";
    const parameters = [authorId];
    return write(sql, parameters);
};