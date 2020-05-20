'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('', () => {

});

router.get('', () => {

});

router.get('', () => {

});

router.put('', () => {

});

router.delete('/lms/admin/books/:bookId', (request, response) => {
    service.delete(request.params.bookId, (result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

module.exports = router;
