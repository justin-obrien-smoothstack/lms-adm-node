'use strict';

const router = require('express').Router(),
    service = require('../service/publisherCrudService');

router.post('', () => {

});

router.get('', () => {

});

router.get('/lms/admin/publishers', (request, response) => {
    responseAttributes = service.readAll();
    response.status(responseAttributes.status);
    response.send(responseAttributes.message);
});

router.put('', () => {

});

router.delete('', () => {

});

module.exports = router;