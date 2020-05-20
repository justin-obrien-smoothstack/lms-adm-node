const branchService = require("../service/branchService");
const jsontoxml = require("jsontoxml");
let routes = require('express').Router();

routes.get("/lms/admin/branches", (req,res) => {
    branchService.readAll()
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

routes.get("/lms/admin/branches/:id", (req,res) => {
    branchService.readBranch(req.params.id)
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

routes.post("/lms/admin/branches", (req,res) => {
    console.log(req.body);
    branchService.createBranch(req.body)
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

routes.put("/lms/admin/branches", (req,res) => {
    branchService.updateBranch(req.body)
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

routes.delete("/lms/admin/branches/:id", (req,res) => {
    branchService.deleteBranch(req.params.id)
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