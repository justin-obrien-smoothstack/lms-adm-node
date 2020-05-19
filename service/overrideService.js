'use strict';

const dao = require('../oDao/loanDao.js'), moment = require('moment');

exports.override = async (loanId) => {
    const result = {
        status: 500,
        message: 'There was an error while trying to ' +
            'read the loan from the database.'
    };
    let loan;
    try {
        loan = (await dao.read(loanId.bookId,
            loanId.cardNo, loanId.branchId, loanId.dateOut))[0];
    } catch (e) {
        return result;
    }
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
        try {
            loan.dueDate.setDate(loan.dueDate.getDate() + 7);
            loan.dueDate = moment(loan.dueDate).format('YYYY-MM-DD hh:mm:ss');
            await dao.update(loan);
            result.status = 200;
            result.message = 'New due date: ' + loan.dueDate;
        } catch (e) {
            result.message = 'There was an error while trying to ' +
                'update the loan in the database.';
        }
    }
    return result;
}
