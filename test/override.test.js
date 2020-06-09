"use strict";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  sinon = require("sinon"),
  should = chai.should();

chai.use(chaiHttp);

const app = require("../main"),
  loanDao = require("../oDao/loanDao");

const mockLoans = [
  {
    cardNo: 1,
    branchId: 1,
    bookId: 1,
    dateOut: "2020-01-01T07:00:00.000Z",
    dueDate: "2020-01-08T07:00:00.000Z",
    dateIn: null,
  },
  {
    cardNo: 2,
    branchId: 2,
    bookId: 2,
    dateOut: "2020-01-01T07:00:00.000Z",
    dueDate: "2020-01-08T07:00:00.000Z",
    dateIn: "2020-01-08T07:00:00.000Z",
  },
];

describe("Due Date Override", () => {
  it("should retrieve an array of loans", (done) => {
    sinon
      .stub(loanDao, "readOverridableLoans")
      .returns(Promise.resolve(mockLoans));
    chai
      .request(app)
      .get("/lms/admin/loans")
      .end((error, result) => {
        should.equal(error, null);
        result.body.should.be.deep.equal(mockLoans);
        should.equal(result.status, 200);
        done();
      });
  });
});
