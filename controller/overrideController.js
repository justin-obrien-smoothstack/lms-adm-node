'use strict';

const router = require('express').Router(),
    service = reqiure('../service/overrideService');

router.put('/lms/admin/loan/book/:bookId/borrower/:cardNo/branch/:branchId' +
    '/dateout/:dateOut', async (request, response) => {
        const loanId = {
            bookId: bookId,
            cardNo: cardNo,
            branchId: branchId,
            dateOut: dateOut
        }, result = await service.override(loanId);
        response.status(result.status);
        response.send(result.message);
    }
)
