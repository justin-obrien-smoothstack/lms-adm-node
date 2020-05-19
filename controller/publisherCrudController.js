'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('', () => {

});

router.get('', () => {

});

router.get('/lms/admin/publishers/:publisherId', (request, response) => {
    service.readOne(request.params.publisherId).then(result => {
        response.status(result.status);
        response.send(result.message);
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

router.put('', () => {

});

router.delete('', () => {

});

module.exports = router;