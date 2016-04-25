/*

   TO START BUILDING A NODE APPLICATION
   -------------------------------------
   1. Move to the application directory in terminal
   2. $ npm init
   3. hit return until done
      -> this will create a package.JSON where you can define dependencies & information about your application
          there are two main ways you can add module dependencies - (this will mean you application's environment can be easily set up by anyone)
          1. manually enter the name of the npm module in the package.JSON
          or -
          2. When you are installing a module via npm use -S or --save to automatically add it to the dependencies in Package.json
            i.e. $ npm install express --save
          *** now if you ever need to reinstall all the modules you can go to the applications directory in terminal and type
          *** $ npm install *** and node will automatically create a node_modules folder with all your dependencies!
   4. create a file for your code naming it with .js extension
   5. to run the application: $ node [node_document_name].js

*/


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


/*----------- H T T P  R O U T E S (P A T H S)  -----------*/

//the URI for this would be: http://localhost:3000/myApi
//the client sends a request through the /myApi route
app.get('/myApi', function(request, response){

})

// the URI would be: http://localhost:3000/myApi/message?query= query_body
app.get('/myApi/message', function(request, response){


})
