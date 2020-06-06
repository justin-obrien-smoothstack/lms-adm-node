const authorService = require("../service/authorService");
const jsontoxml = require("jsontoxml");
var parseString = require('xml2js').parseString;
let routes = require('express').Router();

routes.get("/lms/admin/authors", (req,res) => {
    authorService.readAll()
    .then(function (result){
        if (result.length == 0)
        {
            res.sendStatus(404);
        }
        else {
            res.format({
                'application/json': function() {
                    res.send(result);
                },
                'application/xml': function() {
                    res.send(jsontoxml(result));
                },
                'text/plain': function() {
                    res.send(result.toString());
                }
            });
        }
    })
    .catch(function (error) {
      res.sendStatus(500);
      console.log(error);
    })
});

routes.get("/lms/admin/authors/:id", (req,res) => {
    authorService.readAuthor(req.params.id)
    .then(function (result){
        if (result.length == 0)
        {
            res.sendStatus(404);
        }
        else {
            res.format({
                'application/json': function() {
                    res.send(result);
                },
                'application/xml': function() {
                    res.send(jsontoxml(result));
                },
                'text/plain': function() {
                    res.send(result.toString());
                }
            });
        }
    })
    .catch(function (error) {
      res.status(500);
      res.send("an unknown error occourred");
      console.log(error);
    })
});

routes.post("/lms/admin/authors", (req,res) => {
    if (req.body.authorName.length > 45 || req.body.authorName.length  < 3 || !req.body.authorName) {
        res.status(400);
        res.send("author name must be between 3 and 45 characters in length");
    } else {
        authorService.createAuthor(req.body)
        .then(function (result){
            res.status(201);
            res.send(result);
        })
        .catch(function (error) {
        res.status(500);
        res.send("an unknown error occourred");
        console.log(error);
        });
    }
});

routes.put("/lms/admin/authors", (req,res) => {
    console.log(req.body);
    if (!req.body.authorName) {
        res.status(400).send("author name required");
    }
    if (req.body.authorName.length > 45 || req.body.authorName.length < 3) {
        res.status(400).send("author name must be between 3 and 45 characters in length");
    }
    authorService.updateAuthor(req.body)
    .then(function (result){
        res.status(result.status);
        res.send(result.message);
    })
    .catch(function (error) {
      res.status(500);
      res.send("an unknown error occourred");
      console.log(error);
    })
});

routes.delete("/lms/admin/authors/:id", (req,res) => {
    authorService.deleteAuthor(req.params.id)
    .then(function (result){
        res.status(result.status);
        res.send(result.message);
    })
    .catch(function (error) {
      res.status(500);
      res.send("an unknown error occourred");
      console.log(error);
    })
});

module.exports = routes;