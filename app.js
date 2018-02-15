var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var port = 3000;

// var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
//     ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
//     mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
//     mongoURLLabel = "";

// if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
//   var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
//       mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
//       mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
//       mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
//       mongoPassword = process.env[mongoServiceName + '_PASSWORD']
//       mongoUser = process.env[mongoServiceName + '_USER'];

//   if (mongoHost && mongoPort && mongoDatabase) {
//     mongoURLLabel = mongoURL = 'mongodb://';
//     if (mongoUser && mongoPassword) {
//       mongoURL += mongoUser + ':' + mongoPassword + '@';
//     }
//     // Provide UI label that excludes user id and pw
//     mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
//     mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

//   }
// }
var mongoURL = 'mongodb://';
var mongoUser = process.env.MONGODB_USER || 'sopra';
var mongoPassword = process.env.MONGODB_PASSWORD || 'sopra';
var mongoDatabase = process.env.MONGODB_DATABASE || 'sampledb';
var mongoHost = process.env.MONGODB_SERVICE_HOST || '172.16.17.187';
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
    res.send('hello world');
    // res.sendFile(__dirname + "/index.html");
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
    console.log("Server listening on port " + port);
});