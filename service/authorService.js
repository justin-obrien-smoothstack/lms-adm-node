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
            .then((result) =>{
                responseAttributes.message = `author with name ${author.authorName} created`;
                resolve(responseAttributes);                })
            .catch((error) => {
                reject(error);
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
            .then((result) => {
                if (result.length == 0) { // no record was found
                    responseAttributes.status = 404;
                    responseAttributes.message = `no author with id ${author.authorId} was found`;
                    resolve(responseAttributes);
                } else {
                    authorDao.update(db, author)
                    .then((result) =>{
                        responseAttributes.status = 202;
                        responseAttributes.message = `author with name ${author.authorName} updated`;
                        resolve(responseAttributes);                
                    })
                    .catch((error) => {
                        reject(error);
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
                db.beginTransaction((transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    authorDao.delete(db,authorId)
                    .then((result) =>{
                        responseAttributes.status = 204;
                        responseAttributes.message = `author with id: ${authorId} was deleted`;
                        resolve(responseAttributes);                
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};