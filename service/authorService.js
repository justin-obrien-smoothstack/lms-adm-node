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

exports.readAll = () => {
    return new Promise( (resolve, reject) => {
        let responseAttributes = {};
        authorDao.readAll()
        .then((result) => {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `no author records exist`;
                resolve(responseAttributes);
            } else {
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