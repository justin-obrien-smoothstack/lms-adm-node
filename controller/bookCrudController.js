'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('', () => {

});

router.get('', () => {

});

router.get('/lms/admin/books', (request, response) => {
    service.readAll((result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

router.put('', () => {

});

router.delete('', () => {

});

module.exports = router;
