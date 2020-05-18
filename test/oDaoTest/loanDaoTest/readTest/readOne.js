// passed 05/18 12:23

'use strict';

const dateOut = '2020-05-14 09:43:26';

(async () =>
    console.log(await require('../../../../oDao/loanDao.js').read(10, 3, 25, dateOut)))();