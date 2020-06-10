const authorDao = require("../sDao/authorDao");
const db = require("./db");

exports.readAuthor = (id) => {
    return new Promise( (resolve, reject) => {
        authorDao.read(db,id)
        .then((result) => {
            authorDao.readBooksByAuthor(db,id)
            .then((res) => {
                result[0]['books'] = res;
                resolve(result);
            }) 
            .catch((err) => {
                reject(err);
            });
        
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};

let addBooksToAuthors = async (result) => {
    return new Promise((resolve, reject) => {
        authorDao.readBooksByAuthor(db,result['authorId'])
        .then((res) => {
            result['books'] = res;
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

exports.readAll = async () => {
    return new Promise( (resolve, reject) => {
        authorDao.readAll(db)
        .then(async (result) => {
            for (let i = 0; i < result.length; i++) {
                result[i] = await addBooksToAuthors(result[i]);
            }
            resolve(result);
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};


exports.createAuthor = (author) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};
        db.beginTransaction((transactionError) => {
            if (transactionError) {
              results.transactionError = true;
              reject(results);
              return;
            }
            authorDao.create(db,author)
            .then(async (result) => {
                responseAttributes.message = `author with name ${author.authorName} created`;
                try {
                    await authorDao.removeBookConnections(db, result.insertId);
                }
                catch (error) {
                    console.log(error);
                }
                for (let i = 0; i < author.books.length;i++) {
                    try {
                        await authorDao.addBookConnections(db, author.books[i].bookId, result.insertId);
                    }
                    catch(error) {
                        console.log(error);
                    }
                }
                responseAttributes['result'] = result;
                db.commit(() => resolve(responseAttributes));
             })
            .catch((error) => {
                db.rollback(() => reject(error));
            });
        });
    });
};

exports.updateAuthor = (author) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};

        db.beginTransaction((transactionError) => {
            if (transactionError) {
              results.transactionError = true;
              reject(results);
              return;
            }
            authorDao.read(db, author.authorId)
            .then(async (result) => {
                if (result.length == 0) { // no record was found
                    responseAttributes.status = 404;
                    responseAttributes.message = `no author with id ${author.authorId} was found`;
                    resolve(responseAttributes);
                } else {
                    try {
                        await authorDao.removeBookConnections(db, author.authorId);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    for (let i = 0; i < author.books.length;i++) {
                        try {
                            await authorDao.addBookConnections(db, author.books[i].bookId, author.authorId);
                        }
                        catch(error) {
                            console.log(error);
                        }
                    }
                    authorDao.update(db, author)
                    .then((result) =>{
                        responseAttributes['result'] = result;
                        responseAttributes.status = 202;
                        responseAttributes.message = `author with name ${author.authorName} updated`;
                        db.commit(() => resolve(responseAttributes));
                    })
                    .catch((error) => {
                        db.rollback(() => reject(error));
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    });
};

exports.deleteAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};

        authorDao.read(db, authorId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no author with id ${authorId} was found`;
                resolve(responseAttributes);
            } else {
                db.beginTransaction(async (transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    try {
                        await authorDao.removeBookConnections(authorId);
                    }
                    catch {
                        console.log("An error occurred removing the relational connections "+error);
                    }
                    authorDao.delete(db,authorId)
                    .then((result) =>{
                        responseAttributes.status = 204;
                        responseAttributes.message = `author with id: ${authorId} was deleted`;
                        db.commit(() => resolve(responseAttributes));             
                    })
                    .catch((error) => {
                        db.rollback(() => reject(error));
                    });
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};