// test passed 05/17 19:34

'use strict';

console.log(require('../../oDao/db.js').query('SELECT * FROM tbl_book;',
    (error, results) => console.log(results)));