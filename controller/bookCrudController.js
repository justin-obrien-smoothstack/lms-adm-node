'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('/lms/admin/book', (request, response) => {
    service.create(request.body, (result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

router.get('', () => {

});

router.get('', () => {

});

router.put('', () => {

});

router.delete('', () => {

});

module.exports = router;
