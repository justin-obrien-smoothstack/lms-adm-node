"use strict";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  sinon = require("sinon"),
  should = chai.should();

chai.use(chaiHttp);

const app = require("../main");

let mockPublisher;

describe("Publisher CRUD Controller", () => {
  beforeEach(() => {
    mockPublisher = {
      publisherName: "Mock Name",
      publisherAddress: "Mock Address",
      publisherPhone: "Mock Phone",
      bookIds: [1,2],
    };
  });

  it("should require a name when creating a publisher", (done) => {
    mockPublisher.publisherName = null;
    chai
      .request(app)
      .post("/lms/admin/publisher")
      .send(mockPublisher)
      .end((error, response) => {
        should.equal(error, null);
        response.should.have.status(400);
        should.equal(
          response.text,
          "The field 'publisherName' is required."
        );
        done();
      });
  });
});
