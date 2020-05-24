'use strict';

const router = require('express').Router(),
    service = require('../service/bookCrudService.js');

router.post('/lms/admin/book', (request, response) => {
    service.create(request.body, (result) => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    })
});

router.get('/lms/admin/books/:bookId', (request, response) => {
    service.readOne(request.params.bookId, (result) => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    })
});

router.get('/lms/admin/books', (request, response) => {
    service.readAll((result) => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    })
});

router.put('/lms/admin/book', (request, response) => {
    service.update(request.body, (result) => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    })
});

router.delete('/lms/admin/books/:bookId', (request, response) => {
    service.delete(request.params.bookId, (result) => {
        response.status(result.status);
        response.send(result.message);
    })
});

module.exports = router;
