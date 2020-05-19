// 05/19 00:14 uses default parameter value

'use strict';

(async () =>
    console.log(await require('../../../../oDao/loanDao.js').read(undefined)))();