"use strict";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  sinon = require("sinon"),
  should = chai.should();

chai.use(chaiHttp);

const app = require("../main");

let mockBook;

describe("Book CRUD Controller", () => {
  beforeEach(() => {
    mockBook = {
      title: "Mock Title",
      pubId: 1,
      authorIds: [1, 2],
      genreIds: [1, 2],
    };
  });

  it("should require a title when creating a book", (done) => {
    mockBook.title = null;
    chai
      .request(app)
      .post("/lms/admin/book")
      .send(mockBook)
      .end((error, response) => {
        should.equal(error, null);
        response.should.have.status(400);
        should.equal(response.text, "The field 'title' is required.");
        done();
      });
  });
});
