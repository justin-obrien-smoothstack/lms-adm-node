'use strict';

const router = require('express').Router(),
    jsontoxml = require('jsontoxml'),
    overrideService = require('../service/publisherCrudService');

router.post('/lms/admin/publisher', (request, response) => {
    const publisher = request.body;
    overrideService.create(publisher).then(result => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

router.get('/lms/admin/publishers/:publisherId', (request, response) => {
    overrideService.readOne(request.params.publisherId).then(result => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

router.get('/lms/admin/publishers', (request, response) => {
    overrideService.readAll().then(result => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

router.put('/lms/admin/publisher', (request, response) => {
    overrideService.update(request.body).then(result => {
        response.status(result.status);
        response.format({
            'application/json': () => response.send(result.message),
            'application/xml': () => response.send(jsontoxml(result.message))
        });
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

router.delete('/lms/admin/publishers/:publisherId', (request, response) => {
    overrideService.delete(request.params.publisherId).then(result => {
        response.status(result.status);
        response.send(result.message);
    }).catch(error => {
        response.status(500);
        response.send('An unknown error occurred.');
    })
});

module.exports = router;
