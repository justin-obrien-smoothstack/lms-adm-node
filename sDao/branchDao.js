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


exports.create = (branch) => {
    const sql = "INSERT INTO tbl_library_branch (branchName,branchAddress) " +
    "VALUES(?,?)";
    const parameters = [branch.branchName, branch.branchAddress];
    return write(sql, parameters);
};

exports.read = (branch) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_library_branch WHERE branchId = ?;';
        db.query(sql,branch.branchId,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.readAll = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_library_branch;';
        db.query(sql,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
};

exports.update = (branch) => {
    const sql = "UPDATE tbl_library_branch SET branchName = ?, branchAddress = ? WHERE authorId = ?";
    const parameters = [branch.branchName, branch.branchAddress];
    return write(sql, parameters);
};

exports.delete = (branch) => {
    const sql = "DELETE FROM tbl_library_branch WHERE branchId = ?";
    const parameters = [branch.branchId];
    return write(sql, parameters);
};