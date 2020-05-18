'use strict';

const dateOut = new Date(2020, 4, 14, 9, 43, 26);

(async () =>
    console.log(await require('../../../../oDao/loanDao.js').read(10, 25, 3, dateOut)))();