const authorService = require("../service/authorService");
const jsontoxml = require("jsontoxml");
var parseString = require('xml2js').parseString;
let routes = require('express').Router();

routes.get("/lms/admin/authors", (req,res) => {
    authorService.readAll()
    .then(function (result){
        res.status(result.status);
        res.format({
            'application/json': function() {
                res.send(result.message);
            },
            'application/xml': function() {
                res.send(jsontoxml(result.message));
            },
            'text/plain': function() {
                res.send(result.message.toString());
            }
        });
    })
    .catch(function (error) {
      res.sendStatus(500);
      console.log(error);
    })
});

routes.get("/lms/admin/authors/:id", (req,res) => {
    authorService.readAuthor(req.params.id)
    .then(function (result){
        res.status(result.status);
        res.format({
            'application/json': function() {
                res.send(result.message);
            },
            'application/xml': function() {
                res.send(jsontoxml(result.message));
            },
            'text/plain': function() {
                res.send(result.message.toString());
            }
        });
    })
    .catch(function (error) {
      res.status(500);
      res.send("an unknown error occourred");
      console.log(error);
    })
});

routes.post("/lms/admin/authors", (req,res) => {
    authorService.createAuthor(req.body)
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

routes.put("/lms/admin/authors", (req,res) => {
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