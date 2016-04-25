/// FILE TO BUILD TO DO APP DATABASE TABLES

//modules
var mysql = require('mysql');

////// CONNECT TO MYSQL DATABASE
/// create connection obj
var connection = mysql.createConnection({
  host: 'localhost', // default port is 3306
  user: 'root',
  password: 'root',
  database: 'MY_AWESOME_APP_DATABASE'
});

//connect to database
connection.connect(function(err){
  if(err){
    console.log("ERROR :( = " + err.stack);
    return;
  }
  console.log('connected as id: ' + connection.threadId);
});

/////CREATE ITEM TABLE
/* CREATE TABLE item(id INT(11) NOT NULL AUTO_INCREMENT,
title VARCHAR(200) NOT NULL,
description VARCHAR(250),
due_date DATETIME DEFAULT NULL,
PRIMARY KEY (id))
)
*/

//connection.query('SQL-QUERY-STRING', [OPTIONAL VALUE], function(err,results,fields))
connection.query('CREATE TABLE item(id INT(11) NOT NULL AUTO_INCREMENT,title VARCHAR(200) NOT NULL,description VARCHAR(250),due_date DATETIME DEFAULT NULL, PRIMARY KEY (id))',function(err,results,fields){
  if(err){
    console.log("ERROR ADDING item TABLE = " + err.stack);
    return;
  }
  console.log('CREATED ITEM TABLE');
});

/*
CREATE TABLE tags
(
  item_id INT(100) NOT NULL,
  tag VARCHAR(100) NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (item_id) REFERENCES item(id)
)
*/

////CREATE TAGS TABLE
connection.query('CREATE TABLE tags(item_id INT(100) NOT NULL,tag VARCHAR(100) NOT NULL,PRIMARY KEY (item_id),FOREIGN KEY (item_id) REFERENCES item(id))', function(err, results, fields){
    if(err) {
        console.log("error creating table :( ->" + err.stack);
        return;
    }
    console.log("YOU DID IT: " + results);
});

/*
CREATE TABLE imgs
(
  item_id INT(100) NOT NULL,
  img_url VARCHAR(200) NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (item_id) REFERENCES item(id)
)
*/
/////CREATE IMG TABLE
connection.query('CREATE TABLE imgs(item_id INT(100) NOT NULL,img_url VARCHAR(200) NOT NULL,PRIMARY KEY (item_id),FOREIGN KEY (item_id) REFERENCES item(id))', function(err, results, fields){
    if(err) {
        console.log("error creating table :( ->" + err.stack);
        return;
    }
    console.log("YOU DID IT: " + results);
});


//END connection
connection.end();
