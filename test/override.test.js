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
    dateOut: Date(2020, 0),
    dueDate: Date(2020, 0, 8),
    dateIn: null,
  },
  {
    cardNo: 2,
    branchId: 2,
    bookId: 2,
    dateOut: Date(2020, 0),
    dueDate: Date(2020, 0, 8),
    dateIn: Date(2020, 0, 9),
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
