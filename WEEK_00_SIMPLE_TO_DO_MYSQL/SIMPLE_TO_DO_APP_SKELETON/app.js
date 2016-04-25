/*
  SIMPLE TO DO APP W/ TAGS - MAIN APPLICATION SCRIPT
  APRIL 2016 - PARSONS BFA DESIGN & TECHNOLOGY
  ---------------------------------------------------
  CLIENT HTTP END POINTS:
*/

/* M O D U L E S */
var mysql = require('mysql');
//bcrypt for encrypting passwords for our database
// var bcrypt = require('bcrypt');
//we will be using the express module to create our server to talk to client
var express = require('express');
//to be able to decipher post reqs
var bodyParser = require('body-parser');
//assign our "server" to a variable called "app"
var app = express();

/* DB INIT FUNCTIONS   */
//create connection to database
var connection = mysql.createConnection({
    host: 'localhost',  //default port is 3306
    user: 'root',
    password: 'root',
    database: 'my-to-do-app'
    //, port: port-your-database-is-on
});

//connect function
connection.connect(function(err){
    if(err) {
        console.log("error connecting :( ->" + err.stack);
        return;
    }
    console.log('connected as id: ' + connection.threadId);
});

/* EXPRESS SERVER INIT FUNCTIONS */
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

/* I N I T  S E R V E R */
var port = 3000;
app.listen(port, function(){
    console.log('Server running at:' + port);
});

/*  REST(FUL) HTTP ROUTES - TO COMM W/ CLIENT
i.e http://localhost:3000/item

    -ADD ITEMS (APP.POST('/item'))
    -GET ITEMS (APP.GET('/item'))
    -UPDATE ITEM (APP.PUT('/item'))
    -DELETE ITEMS (APP.DELETE('/item')).
    -ADD TAG (APP.POST('/tag'))?
    -DELETE TAG (APP.DELETE('/tag'))?
*/

//POST ITEM
app.post('/item', function(req, response){
    //console.log(req.task_title, req.task_description);
    //recieve client input data in req.body
    console.log(req.query);
    //and assign to varibale to send
    var item_data = {
      title: req.query.title,
      description: req.query.description
    }
    //send the recieved data to the db.insert_item function
    db.insert_item( item_data , function(result){
        //recieve result in result
        console.log('FROM POST ROUTE METHOD: ' + result);
        //respond to client
        response.json({//response to client here
          msg: 'success',
          res: result
        });
    })
});

// //GET ALL ITEMs
app.get('/items', function(req, res){
    console.log(req.body);

    db.get_items(function(result){
        console.log(result);
        //recieve result in result
        //respond to client
        res.json({//response to client here
          msg: 'retrieved result from database',
          data: result
        });
    })
});

//update ITEM
// app.put('/item', function(req, res){
//     //recieve client input data in req.body
//     //send the recieved data to the db.insert_item function
//     db.update_item(  , function(result){
//         //recieve result in result
//         //respond to client
//         res.json({//response to client here});
//     })
// });

//DELETE ITEM
// app.delete('/item', function(req, res){
//     //recieve client input data in req.body
//     //send the recieved data to the db.insert_item function
//     db.delete_item(  , function(result){
//         //recieve result in result
//         //respond to client
//         res.json({//response to client here});
//     })
// });

//ADD TAG
// app.post('/tag', function(req, res){
//     //recieve client input data in req.body
//     //send the recieved data to the db.insert_item function
//     db.create_tag(  , function(result){
//         //recieve result in result
//         //respond to client
//         res.json({//response to client here});
//     })
// });

//GET BY TAG
// app.get('/tag-item', function(req, res){
//     //recieve client input data in req.body
//     //send the recieved data to the db.insert_item function
//     db.tag_item(  , function(result){
//         //recieve result in result
//         //respond to client
//         res.json({//response to client here});
//     })
// });


/*  DATABASE FUNCTIONS */
/*  ~ TO DO */
//create obj to store all functions for convienance
var db = {};
//lets add our sql syntax to our obj so it can easily be inserted into the FUNCTIONS
db.queries = {
  insert_item: 'INSERT INTO item(title, description) VALUES(?,?)',
  insert_tag: 'INSERT INTO tag(tag) VALUES(?)',
  tag_item:'INSERT INTO tags(item_id, tag_id) VALUES((SELECT id FROM item WHERE id=?), (SELECT id FROM tag WHERE id=?))',
  get_items: 'SELECT item.title,item.description, tag.tag FROM item, tag, tags WHERE tags.item_id = item.id and tags.tag_id = tag.id',
  update_item: 'UPDATE item SET ? = ? WHERE id = ?',
  delete_item: 'DELETE FROM item WHERE id = ?',
  get_all_items: 'SELECT * FROM item'
}

//INSERT ITEM // DONE!
db.insert_item = function(item_data, callback){
    // format the sql sring
    //INSERT INTO item(title, description) VALUES(?,?)
    var inserts = [item_data.title, item_data.description];
    var formattedSQL = mysql.format(db.queries.insert_item,inserts);

    //INSERT INTO item(table,description) VALUES('title', 'description')
    connection.query(formattedSQL,function(err,results,feilds){
      if(err){
        console.log(err);
        callback(err);
      }
      callback(results);
    });
} ////// FINISHED!

//GET ALL ITEMS
db.get_items = function(callback){

    connection.query(db.queries.get_all_items,function(err,results,feilds){
      if(err){
        console.log(err);
        callaback(err);
      }
      callback(results);
    });
}

// //ITEM UPDATE
// db.update_item = function(item_data, callback){
//     connection.query(' ',function(err,results,feilds){
//       if(err){console.log(err);}
//       callback(results);
//     });
// }
//
// db.delete_item = function(item_data, callback){
//     connection.query(' ',function(err,results,feilds){
//       if(err){console.log(err);}
//       callback(results);
//     });
// }
//
// db.create_tag = function(tag_data, callback){
//     connection.query(' ',function(err,results,feilds){
//       if(err){console.log(err);}
//       callback(results);
//     });
// }
//
// db.tag_item = function(tag_data, callback){
//     connection.query(' ',function(err,results,feilds){
//       if(err){console.log(err);}
//       callback(results);
//     });
// }
