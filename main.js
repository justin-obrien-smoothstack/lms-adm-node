const bodyParser = require('body-parser'), express = require('express'),
    app = express();
const xmlparser = require('express-xml-bodyparser');

app.use(xmlparser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log("server started at port 3000");
app.use(require('./controller/authorController'));
app.use(require('./controller/branchController'));
app.use(require('./controller/bookCrudController.js'));
app.use(require('./controller/publisherCrudController.js'));
app.use(require('./controller/overrideController.js'));
app.listen(3000);

