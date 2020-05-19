'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('', () => {

});

router.get('', () => {

});

router.get('', () => {

});

router.put('', () => {

});

router.delete('/lms/admin/publishers/:publisherId', (request, response) => {
    service.delete(request.params.publisherId).then(result => {
        response.status(result.status);
        response.send(result.message);
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

module.exports = router;