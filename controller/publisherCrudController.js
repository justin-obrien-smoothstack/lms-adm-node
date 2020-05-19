'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('', () => {

});

router.get('', () => {

});

router.get('', () => {

});

router.put('/lms/admin/publisher', (request, response) => {
    service.update(request.body).then(result => {
        response.status(result.status);
        response.send(result.message);
    })/*.catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })*/
});

router.delete('', () => {

});

module.exports = router;