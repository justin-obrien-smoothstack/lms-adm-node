'use strict';

const service = require('../../../service/overrideService.js');

const loanId = {
    bookId: 11,
    cardNo: 4,
    branchId: 27,
    dateOut: '2020-05-09 10:53:58'
};

(
    async () => console.log(await service.override(loanId))
)();
