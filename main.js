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

app.use(require('./controller/authorController'));

app.use(require('./controller/branchController'));

app.listen(3000);

console.log("server started at port 3000");