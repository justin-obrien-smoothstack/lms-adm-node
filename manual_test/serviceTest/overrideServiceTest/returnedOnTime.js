// passed 05/18 21:00

'use strict';

const service = require('../../../service/overrideService.js');

const loanId = {
    bookId: 9,
    cardNo: 1,
    branchId: 25,
    dateOut: '2020-05-10 17:48:00'
};

(
    async () => console.log(await service.override(loanId))
)();
