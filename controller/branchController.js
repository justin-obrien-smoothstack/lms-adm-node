const branchService = require("../service/branchService");
const jsontoxml = require("jsontoxml");
let routes = require('express').Router();

routes.get("/lms/admin/branches", (req,res) => {
    branchService.readAll()
    .then(function (result){
        if (result.length == 0) {
            res.sendStatus(404);
        } else {
            res.format({
                'application/json': function() {
                    res.status(200).send(result);
                },
                'application/xml': function() {
                    res.status(200).send(jsontoxml(result));
                },
                'text/plain': function() {
                    res.status(200).send(result.toString());
                }
            });
        }
    })
    .catch(function (error) {
      res.sendStatus(500);
      console.log(error);
    })
});

routes.get("/lms/admin/branches/:id", (req,res) => {
    branchService.readBranch(req.params.id)
    .then(function (result){
        if (result.length == 0) {
            res.sendStatus(404);
        } else {
            res.format({
                'application/json': function() {
                    res.status(200).send(result);
                },
                'application/xml': function() {
                    res.status(200).send(jsontoxml(result));
                },
                'text/plain': function() {
                    res.status(200).send(result.toString());
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

routes.post("/lms/admin/branches", (req,res) => {
    console.log(req.body);
    if (!req.body.branchName || !req.body.branchAddress) {
        res.status(400).send("branch name and address cannot be empty.")
    }

    if (req.body.branchName.length > 45 || req.body.branchName.length < 3) {
        res.status(400).send("branch name must be between 3 and 45 characters")
    } 
 
    if (req.body.branchAddress.length > 45 || req.body.branchAddress.length < 3) {
        res.status(400).send("branch address must be between 3 and 45 characters")
    } 

    branchService.createBranch(req.body)
    .then(function (result){
        res.status(result.result);
        res.send(result.message);
    })
    .catch(function (error) {
      res.status(500);
      res.send("an unknown error occourred");
      console.log(error);
    })
});

routes.put("/lms/admin/branches", (req,res) => {
    if (!req.body.branchName || !req.body.branchAddress || !req.body.branchId) {
        res.status(400).send("branch name and address cannot be empty.")
    }

    if (req.body.branchName.length > 45 || req.body.branchName.length < 3) {
        res.status(400).send("branch name must be between 3 and 45 characters")
    } 

    if (req.body.branchAddress.length > 45 || req.body.branchAddress.length < 3) {
        res.status(400).send("branch address must be between 3 and 45 characters")
    } 

    branchService.updateBranch(req.body)
    .then(function (result){
        res.status(result.status);
        res.send(result.result);
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