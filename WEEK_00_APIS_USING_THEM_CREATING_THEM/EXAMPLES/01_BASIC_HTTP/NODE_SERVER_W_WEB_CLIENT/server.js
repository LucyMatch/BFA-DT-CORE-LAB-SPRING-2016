/*----------- M O D U L E S -----------*/
var express = require('express');             //A MODULE USED TO CREATE SERVERS
var app = module.exports = express();         //CREATE AN INSTANCE OF EXPRESS CALLED APP
var bodyParser = require('body-parser');      //MODULE FOR PARSING JSON
var server = require('http').Server(app);     //SET UP THE SERVER

//port the server will run at
//http://localhost:3000
//to get localhost ip address : $ ipconfig getifaddr en0
//I.E. http://192.001.1.124:3000
var port = 3000;

/*----------- H T T P  S E T T I N G S  -----------*/
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

//THIS WILL RUN WHEN THE SERVER FIRST STARTS
server.listen(port, function() {
    console.log('Server running at port:' + port);
});

//You can host static files on the server you have just created
//For Example if we wanted to host a front end client - html, javascript - on this server
//we point the server to the directory which houses these files.
app.use('/', express.static(__dirname + '/public'));

/*----------- H T T P  R O U T E S (P A T H S)  -----------*/

app.get('/myApi', function(request, response){

    console.log("A Client is Requesting something from route myApi");
    console.log("the req body is:" + request.data);

    //let's respond to the client
    response.json({
      status: "success",
      data: "Hey there! Welcome to my Api!"
    })

})

// you can nest routes like this
// the URI would be: http://localhost:3000/myApi/message?query= query_body
// this path will recieve the request from the client and respond accordingly
app.get('/myApi/message', function(request, response){

    //let's print the client's request
    console.log(request.query);

    //assign the request query to a variable so we can analyse it
    var query = request.query.query;

    //now lets respond to the client depending on what they have requested
    if(query == 'hello'){
        response.json({
          status: "success",
          data: "Hey there! Nice to meet you"
        })
    }else if(query == "goodbye"){
        response.json({
          status: "success",
          data: "See Ya later!"
        })
    }else{
        response.json({
          status: "error",
          data: "You did not send a valid query"
        })
    }

})
