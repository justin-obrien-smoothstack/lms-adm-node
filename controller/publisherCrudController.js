'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('', () => {

});

router.get('', () => {

});

router.get('/lms/admin/publishers', (request, response) => {
    service.readAll().then(result => {
        response.status(responseAttributes.status);
        response.send(responseAttributes.message);
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