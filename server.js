var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var urlBD = "mongodb+srv://gulapp:newTh8izhanlv@cluster0.hjkbi.mongodb.net/gulapp?retryWrites=true&w=majority";
var opts = {useNewUrlParser : true, connectTimeoutMS:20000};
var mongoose = require('mongoose');

mongoose.connect(urlBD,opts).then
(
    () => {
            console.log("Conectado!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);

// Import router
var apiRoutes = require("./api-endpoints")


// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Setup server port
var port = process.env.PORT || 47000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));

// Use Api routes in the App
app.use('/apiGulappX', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running on port " + port);
});

