

exports.create = (db, author) => {
    const sql = "INSERT INTO tbl_author (authorName) " +
    "VALUES(?)";
    const parameters = [author.authorName];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });
};

exports.read = (db, authorId) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_author WHERE authorId = ?;';
        db.query(sql,authorId,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.readBooksByAuthor = (db, authorId) => {
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



exports.readAll = (db) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_author;';
        db.query(sql,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.update = (db, author) => {
    const sql = "UPDATE tbl_author SET authorName = ? WHERE authorId = ?";
    const parameters = [author.authorName, author.authorId];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });
};

exports.delete = (db, authorId) => {
    const sql = "DELETE FROM tbl_author WHERE authorId = ?";
    const parameters = [authorId];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });
};