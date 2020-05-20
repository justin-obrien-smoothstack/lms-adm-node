'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('', () => {

});

router.get('/lms/admin/books/:bookId', (request, response) => {
    service.readOne(request.params.bookId, (result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

router.get('', () => {

});

router.put('', () => {

});

router.delete('', () => {

});

module.exports = router;
