/*
  SIMPLE TO DO APP W/ TAGS - DATABASE BUILD SCRIPT
  APRIL 2016 - PARSONS BFA DESIGN & TECHNOLOGY
*/

//modules
var mysql = require('mysql');

////// CONNECT TO MYSQL DATABASE //////
/// create connection obj
/// enter your mysql database connection details - if using MAMP default pw & usr = root, root
/// for more options / info: https://www.npmjs.com/package/mysql#establishing-connections
var connection = mysql.createConnection({
  host: 'localhost', // default port is 3306
  user: 'root',
  password: 'root',
  database: 'my-to-do-app' // name of database
});

//connect to database
connection.connect(function(err){
  if(err){
    console.log("ERROR :( = " + err.stack); // print error if error is returned
    return;
  }
  console.log('connected as id: ' + connection.threadId); // yay you've connected!
});

/*
CREATE OBJECT TO HOLD OUR SQL STRINGS SO ITS EASY TO CHANGE ETC
REFER TO SQL-COMMANDS.txt for reference to the sql string queries we are using
*/

var sqlStrings = {
  item: 'CREATE TABLE item ( id INT(100) NOT NULL auto_increment, title VARCHAR(200) NOT NULL, description VARCHAR(250), due_date DATETIME DEFAULT NULL, PRIMARY KEY (id) )',
  tag: 'CREATE TABLE tag ( id INT(11) NOT NULL auto_increment, tag VARCHAR(50) NOT NULL, PRIMARY KEY(id) )',
  tags: 'CREATE TABLE tags ( item_id INT(100) NOT NULL, tag_id INT(11) NOT NULL, FOREIGN KEY (item_id) REFERENCES item(id), FOREIGN KEY (tag_id) REFERENCES tag(id) )',
  imgs: 'CREATE TABLE imgs ( item_id INT(100) NOT NULL, img_url VARCHAR(200) NOT NULL,PRIMARY KEY (item_id), FOREIGN KEY (item_id) REFERENCES item(id) )'
}

////// CREATE OUR TABLES!! //////

//CREATE ITEM TABLE
//connection.query('SQL-QUERY-STRING', [OPTIONAL VALUE], function(err,results,fields){ //success or error });
connection.query(sqlStrings.item,function(err,results,fields){
  if(err){
    console.log("ERROR ADDING item TABLE = " + err.stack);
    return;
  }
  console.log('CREATED ITEM TABLE');
});

////CREATE TAG TABLE
connection.query(sqlStrings.tag,function(err,results,fields){
  if(err){
    console.log("ERROR ADDING item TABLE = " + err.stack);
    return;
  }
  console.log('CREATED TAG TABLE');
});


////CREATE TAGS TABLE
connection.query(sqlStrings.tags,function(err,results,fields){
  if(err){
    console.log("ERROR ADDING item TABLE = " + err.stack);
    return;
  }
  console.log('CREATED TAGS TABLE');
});

/////CREATE IMG TABLE
connection.query(sqlStrings.imgs,function(err,results,fields){
  if(err){
    console.log("ERROR ADDING item TABLE = " + err.stack);
    return;
  }
  console.log('CREATED IMGS TABLE');
});


//END connection
connection.end();
