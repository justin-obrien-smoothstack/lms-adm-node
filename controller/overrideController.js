'use strict';

const router = require('express').Router(),
    service = require('../service/overrideService');

router.put('/lms/admin/loan/book/:bookId/borrower/:cardNo/branch/:branchId' +
    '/dateout/:dateOut', async (request, response) => {
        const loanId = {
            bookId: request.params.bookId,
            cardNo: request.params.cardNo,
            branchId: request.params.branchId,
            dateOut: request.params.dateOut
        }, result = await service.override(loanId);
        response.status(result.status);
        response.send(result.message);
    }
)

module.exports = router;