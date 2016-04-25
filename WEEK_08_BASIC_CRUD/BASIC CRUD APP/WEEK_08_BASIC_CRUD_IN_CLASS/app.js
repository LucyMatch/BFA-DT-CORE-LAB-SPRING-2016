/*

To Do App -
Json File as Database
Node.js / Express server
Underscore.js HTML templater

*/

/* M O D U L E S */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

// .use is a middleware
// parse application/x-www-form-urlencoded
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

//Statically host our "/public" folder i.e. index.html will be hosted at
//the '/' = ROOT of our webserverHost. = http://localhost:PORT/
app.use('/', express.static(__dirname + '/public'));

//Path to JSON file - which is going to act as our Database
var PATH_TO_JSON = 'data';
var JSON_FILE_NAME = 'To_Do_App_Data';

/* S E R V E R   R O U T E S */

//Get all tasks
app.get('/tasks', function(req, res){
    console.log(req.query);
    // //read the JSON data file to get our tasks!
    fs.readFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', 'utf8', function(err, data){
        if(err){
          console.log('ERROR' + err);
          return;
        }
        data = JSON.parse(data);
    //     //return the data fetched from file to client
        res.json({
          data : data
        });
    });
});

//Create a task
app.post('/task', function(req, res){
    console.log(req.body);
    //
    // //Check to see if we have JSON db File
    // data / To_Do_App_Data.JSON
    if(!fs.existsSync(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON')){
    //       //If doesn't exsist create a new file
          fs.writeFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', '[]', function(err){
              if(err){
                  console.log(err);
              } else {
                  console.log("Successfully created a new JSON data storage file");
              }
          });
    }
    // // Then let's read the JSON file - if just created will be empty
    // // we will also parse this into a proper array format
    fs.readFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', 'utf8', function(err,data){
            data = JSON.parse(data);
            console.log(data);
    //       //add new JSON object aka task into 'data' array using '.unshift'
          data.unshift({
            id: new Date().getTime(),
            title: req.body.t,
            description: req.body.d,
            done: false
          });
    //       //Now we want to rewrite the file
          fs.writeFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', JSON.stringify(data), function(err){
              if(err){
                  console.log(err);
                  res.json({
                    status: 'ERROR',
                    error: err
                  });
              } else {
                  console.log("File successfully saved!");
              //Send back to client
                  res.json({
                    status: 'OK'
                  });
              }
          })
    })
});

//Delete a task
app.delete('/task', function(req, res){
    // console.log('deleting ' + req.body.id);
    // //read file & find the task's id
    // fs.readFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', 'utf8', function(err, data){
    //     data = JSON.parse(data);
    //     console.log(data);
    //     // Loop through the data to find a matching ID
    //     data.forEach(function(item){
    //       console.log(item)
    //         if(item.id == req.body.id) {
    //             console.log(item);
    //             //use splice to get remove the task from the json object
    //             data.splice(data.indexOf(item),1);
    //         }
    //     });
    //     console.log("Data After Delete");
    //     console.log(data);
    //     //Re-Write the file
    //     fs.writeFile(PATH_TO_JSON + '/' + JSON_FILE_NAME + '.JSON', JSON.stringify(data), function(err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log("The file was saved!");
    //             res.json({
    //                 status: 'OK'
    //             });
    //         }
    //     });
    // });
});

/* I N I T  S E R V E R */
var port = 3000;
app.listen(port, function(){
    console.log('Server running at:' + port);
});
