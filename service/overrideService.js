'use strict';

const dao = require('../oDao/loanDao.js');

exports.override = async (loanId) => {
    const result = {},
        loan = await dao.read(loanId.bookId,
            loanId.cardNo, loanId.branchId, loanId.dateOut)[0];
    let newDueDate;
    if (loan === undefined) {
        result.status = 404;
        result.message = 'That loan was not found.';
    }
    else if (loan.dueDate === null) {
        result.status = 400;
        result.message = 'That loan has no due date.';
    }
    else if (loan.dateIn !== null && loan.dateIn <= Date.now()
        && loan.dateIn <= loan.dueDate) {
        result.status = 400;
        result.message = 'That loan was returned on time.';
    }
    else {
        newDueDate loan.dueDate.getFullYear() + '-' + loan.dueDate.getMonth + '-' + loan.
        loan.dueDate.setDate(loan.dueDate.getDate() + 7);
        await dao.update(loan);
        result.status = 200;
        result.message = toString(loan);
    }
    return result;
}