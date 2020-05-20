'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('', () => {

});

router.get('', () => {

});

router.get('', () => {

});

router.put('/lms/admin/book', (request, response) => {
    service.update(request.body, (result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

router.delete('', () => {

});

module.exports = router;
