const bodyParser = require("body-parser"),
  express = require("express"),
  app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(require("./controller/genreCrudController"));
app.use(require("./controller/borrowerCrudController"));
app.use(require("./controller/authorController"));
app.use(require("./controller/branchController"));
app.use(require("./controller/bookCrudController"));
app.use(require("./controller/publisherCrudController"));
app.use(require("./controller/overrideController"));
app.listen(3000);
