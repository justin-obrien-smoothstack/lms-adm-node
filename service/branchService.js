const branchDao = require("../sDao/branchDao");
const db = require("./db");

exports.readBranch = (id) => {
    return new Promise( (resolve, reject) => {
        branchDao.read(db,id)
        .then((result) => {
            resolve(result);
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
        branchDao.readAll(db)
        .then((result) => {
           resolve(result);
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

        db.beginTransaction((transactionError) => {
            if (transactionError) {
              results.transactionError = true;
              reject(results);
              return;
            }
            branchDao.create(db, branch)
            .then((result) =>{
                responseAttributes.status = 201;
                responseAttributes.message = `branch with name ${branch.branchName} created`;
                db.commit(() => resolve(responseAttributes));                
            })
            .catch((error) => {
                // db,rolreject(error);
                db.rollback(() => {reject(error);})
            });
        });
    });
};

exports.updateBranch = (branch) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};
        
        branchDao.read(db, branch.branchId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no branch with id ${branch.branchId} was found`;
                resolve(responseAttributes);
            } else {
                db.beginTransaction((transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    branchDao.update(db, branch)
                    .then((result) =>{
                        responseAttributes.status = 202;
                        responseAttributes.message = `branch with name ${branch.branchName} updated`;
                        db.commit(() => resolve(responseAttributes));
                    })
                    .catch((error) => {
                        db.rollback(() => {reject(error);})
                    });
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};

exports.deleteBranch = (branchId) => {
    return new Promise((resolve, reject) => {
        let responseAttributes = {};

        branchDao.read(db, branchId)
        .then((result) => {
            if (result.length == 0) { // no record was found
                responseAttributes.status = 404;
                responseAttributes.message = `no branch with id ${branchId} was found`;
                resolve(responseAttributes);
            } else {
                db.beginTransaction((transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    branchDao.delete(db,branchId)
                    .then((result) =>{
                        responseAttributes.status = 204;
                        responseAttributes.message = `branch with id: ${branchId} was deleted`;
                        db.commit(() => resolve(responseAttributes));
                    })
                    .catch((error) => {
                        db.rollback(() => {reject(error);})
                    });
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};