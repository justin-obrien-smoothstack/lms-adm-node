const authorDao = require("../sDao/authorDao");

const maxLength = 45;
const minLength = 2;

exports.readAuthor = (id) => {
    return new Promise( (resolve, reject) => {
        let responseAttributes = {};
        authorDao.read(id)
        .then((result) => {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `author with id: ${id} does not exist`;
                resolve(responseAttributes);
            } else {
                authorDao.readBooksByAuthor(id)
                .then((res) => {
                    result[0]['books'] = res;
                    responseAttributes.status = 200;
                    responseAttributes.message = result;
                    resolve(responseAttributes);
                }) 
                .catch((err) => {
                    reject(err);
                });
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};

let addBooksToAuthors = async (result) => {
    return new Promise((resolve, reject) => {
        authorDao.readBooksByAuthor(result['authorId'])
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
        let responseAttributes = {};
        authorDao.readAll()
        .then(async (result) => {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `no author records exist`;
                resolve(responseAttributes);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i] = await addBooksToAuthors(result[i]);
                }
                responseAttributes.status = 200;
                responseAttributes.message = result;
                resolve(responseAttributes);
            }
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
        if (author.authorName == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "author name cannot be undefined";
            resolve(responseAttributes);
        }

        if (author.authorName.length >= maxLength ||
            author.authorName.length < minLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `all text fields must be between ${minLength} and ${maxLength}`;
            resolve(responseAttributes);
        }

        authorDao.create(author)
        .then((result) =>{
            responseAttributes.status = 201;
            responseAttributes.message = `author with name ${author.authorName} created`;
            resolve(responseAttributes);                })
        .catch((error) => {
            reject(error);
        });
    });
};

exports.updateAuthor = (author) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};
        if (author.authorName == undefined || author.authorId == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "neither author name or id can be undefined";
            resolve(responseAttributes);
        }

        if (author.authorName.length >= maxLength ||
            author.authorName.length < minLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `all text fields must be between ${minLength} and ${maxLength} characters`;
            resolve(responseAttributes);
        }
        
        authorDao.read(author.authorId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no author with id ${author.authorId} was found`;
                resolve(responseAttributes);
            } else {
                authorDao.update(author)
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
};

exports.deleteAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};

        if (authorId == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "author id cannot be undefined";
            resolve(responseAttributes);
        }
        authorDao.read(authorId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no author with id ${authorId} was found`;
                resolve(responseAttributes);
            } else {
                authorDao.delete(authorId)
                .then((result) =>{
                    responseAttributes.status = 204;
                    responseAttributes.message = `author with id: ${authorId} was deleted`;
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
};