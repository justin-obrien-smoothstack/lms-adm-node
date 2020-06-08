"use strict";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  sinon = require("sinon"),
  should = chai.should();

chai.use(chaiHttp);

const app = require("../main");

const mockLoans = [
  {
    cardNo: 6,
    branchId: 29,
    bookId: 14,
    dateOut: new Date("2020-05-15T22:55:38.000Z"),
    dueDate: new Date("2020-05-22T22:55:38.000Z"),
    dateIn: new Date("2020-05-22T22:56:00.000Z"),
  },
];

describe("Due Date Override", () => {
  it("should retrieve an array of loans", (done) => {
    // sinon
    //   .stub(overrideController.overrideService, "readOverridableLoans")
    //   .returns(mockLoans);
    chai
      .request(app)
      .get("/lms/admin/loans")
      .then((result) => {
        // should.equal(error, null);
        result.body.should.be.an("array");
        // should.equal(request.body, mockLoans);
        // should.equal(0, 1);
        // should.equal(result.status, 200);
        done();
      });
  });
});
