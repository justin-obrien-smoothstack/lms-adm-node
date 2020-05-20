const branchDao = require("../sDao/branchDao");

const maxLength = 45;
const minLength = 2;

exports.readBranch = (id) => {
    return new Promise( (resolve, reject) => {
        let responseAttributes = {};
        branchDao.read(id)
        .then((result) => {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `branch with id: ${id} does not exist`;
                resolve(responseAttributes);
            } else {
                responseAttributes.status = 200;
                response.message = result;
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
        branchDao.readAll()
        .then((result) => {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `no branch records exist`;
                resolve(responseAttributes);
            } else {
                responseAttributes.status = 200;
                response.message = result;
                resolve(responseAttributes);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};


exports.createBranch = (branch) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};
        if (branch.branchName == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "branch name cannot be undefined";
            resolve(responseAttributes);
        }

        if (branch.branchName.length >= maxLength ||
            branch.branchName.length < minLength ||
            branch.branchAddress.length >= maxLength ||
            branch.branchAddress.length < minLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `all text fields must be between ${minLength} and ${maxLength}`;
            resolve(responseAttributes);
        }

        branchDao.create(branch)
        .then((result) =>{
            responseAttributes.status = 201;
            responseAttributes.message = `branch with name ${branch.branchName} created`;
            resolve(responseAttributes);                })
        .catch((error) => {
            reject(error);
        });
    });
};

exports.updateBranch = (branch) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};
        if (branch.branchName == undefined || branch.branchId == undefined || branch.branchAddres == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "neither branch name, id, nor address can be undefined";
            resolve(responseAttributes);
        }

        if (branch.branchName.length >= maxLength ||
            branch.branchName.length < minLength  ||
            branch.branchAddress.length >= maxLength ||
            branch.branchAddress.length < minLength) { 
            responseAttributes.status = 400;
            responseAttributes.message = `all text fields must be between ${minLength} and ${maxLength} characters`;
            resolve(responseAttributes);
        }
        
        branchDao.read(branch.branchId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no branch with id ${branch.branchId} was found`;
                resolve(responseAttributes);
            } else {
                branchDao.update(branch)
                .then((result) =>{
                    responseAttributes.status = 202;
                    responseAttributes.message = `branch with name ${branch.branchName} updated`;
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

exports.deletebranch = (branch) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};

        if (branch.branchId == undefined) {
            responseAttributes.status = 400;
            responseAttributes.message = "neither branch id cannot be undefined";
            resolve(responseAttributes);
        }

        branchDao.read(branch.branchId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no branch with id ${branch.branchId} was found`;
                resolve(responseAttributes);
            } else {
                branchDao.delete(branch)
                .then((result) =>{
                    responseAttributes.status = 204;
                    responseAttributes.message = `branch with id: ${branch.branchId} was deleted`;
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