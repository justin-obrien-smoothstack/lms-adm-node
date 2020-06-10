
exports.create = (db, branch) => {
    const sql = "INSERT INTO tbl_library_branch (branchName,branchAddress) " +
    "VALUES(?,?)";
    const parameters = [branch.branchName, branch.branchAddress];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });};

exports.read = (db, branchId) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_library_branch WHERE branchId = ?;';
        db.query(sql,branchId,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    })
};

exports.readAll = (db) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_library_branch;';
        db.query(sql,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
};

exports.readBookCopies = async (db, branchId) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM tbl_book_copies WHERE branchId = ?';
        let parameters = [branchId];
        db.query(sql, parameters, function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
}

exports.getBookTitles = (db, bookId) => { 
    return new Promise((resolve, reject) => {
        let sql = 'SELECT title FROM tbl_book WHERE bookId =?'
        let parameters = [bookId];
        db.query(sql, parameters, function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
}

exports.update = (db,branch) => {
    const sql = "UPDATE tbl_library_branch SET branchName = ?, branchAddress = ? WHERE branchId = ?";
    const parameters = [branch.branchName, branch.branchAddress, branch.branchId];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });
};

exports.delete = (db, branchId) => {
    const sql = "DELETE FROM tbl_library_branch WHERE branchId = ?";
    const parameters = [branchId];
    return new Promise((resolve, reject) => {
        db.query(sql, parameters, (error, result) => {
            if (error) 
                reject(error);
            resolve(result);
        });
    });
};