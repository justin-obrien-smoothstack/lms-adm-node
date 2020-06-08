"use strict";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  should = chai.should();

chai.use(chaiHttp);

const overrideController = require("../controller/overrideController");

describe("LMS", () => {
  it("should return status 404", (done) => {
    chai
      .request(overrideController)
      .get("/x")
      .end((error, result) => {
        result.should.have.status(404);
        done();
      });
  });
});
