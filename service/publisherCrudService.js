"use strict";

const db = require("./db"),
  dao = require("../oDao/publisherDao");

const maxLength = 45;

exports.createPublisher = (publisher)=>{
    const results = {};
    return new Promise((resolve, reject)=>{
        if(!publisher.publisherName){
            results.noName = true;
        }
    })
}