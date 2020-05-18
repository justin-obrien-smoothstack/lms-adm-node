'use strict';

const loan = {
    bookId: 9,
    cardNo: 1,
    branchId: 25,
    dateOut: '2020-05-10 17:48:00',
    dueDate: '2020-05-17 17:48:00',
    dateIn: '2020-05-10 16:23:59'
}

require('../../../../oDao/loanDao').update(loan).then(result => console.log(result));