var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var port = 3000;
//MONGODB_SERVICE_HOST:172.30.155.155
var mongoURL = 'mongodb://';
var mongoUser = process.env.MONGODB_USER || 'admin';
var mongoPassword = process.env.MONGODB_PASSWORD || 'admin';
var mongoDatabase = process.env.MONGODB_DATABASE || 'sampledb';
var mongoHost = process.env.MONGODB_SERVICE_HOST || 'MONGODB_SERVICE_HOST';
var mongoPort = process.env.MONGODB_SERVICE_PORT || '27017';

mongoURL += mongoUser + ':' + mongoPassword + '@';
mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;


console.log('mongoURL-->' + mongoURL);
mongoose.connect(mongoURL);
// mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    console.log(process.env.DATABASE_USER);
    console.log(process.env.MONGODB_USER);
    //res.send('hello world');
     res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    console.log(req.body);
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log(process.env.DATABASE_USER);
    console.log(process.env.MONGODB_USER);
    console.log("Server listening on port " + port);
});