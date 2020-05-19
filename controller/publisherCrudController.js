'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('/lms/admin/publisher', (request, response) => {
    const publisher = request.body;
    service.create(publisher).then(result => {
        response.status(result.status);
        response.send(result.message);
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
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