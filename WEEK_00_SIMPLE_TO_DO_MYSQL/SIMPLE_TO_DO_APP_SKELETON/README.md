# SIMPLE TO DO APPLICATION
### PARSONS BFA DESIGN & TECHNOLOGY - CORE LAB - SPRING 2016
---
## STRUCTURE

### DATABASE : MYSQL
- (in class using default local mamp set up)

### "API" / APPLICATION SERVER: NODE.js

#### **build_db.js**

   **_NPM:_**  
mysql module (https://www.npmjs.com/package/mysql)

   **_FUNCTION:_**   
uses the mysql module to create your database structure by sending SQL query's to the database to create the tables and define their structure and relationships.

#### **app.js**

**_NPM:_**   
    mysql module (https://www.npmjs.com/package/mysql)
    express module (https://www.npmjs.com/package/express)
    body-parser (https://www.npmjs.com/package/body-parser)

**_FUNCTION:_**  
    Express server is created to allow RESTful - HTTP() endpoints to allow  **CLIENT** to;   

-_ADD ITEMS_ **_(APP.POST('/item'))_**  
-_GET ITEMS_ **_(APP.GET('/item'))_**  
-_UPDATE ITEM_ **_(APP.PUT('/item'))_**  
-_DELETE ITEMS_ **_(APP.DELETE('/item'))_**.  

When a client sends http requests through these end points, the application tier will respond accordingly (using express server) after using the mysql module to query the following;   

-_retrieve_ **_(GET)_**  
-_add_ **_(INSERT)_**   
-_update_ **_(UPDATE)_**  
-_remove_ **_(DELETE)_**    

---

## RUNNING THE CODE

do this better  
Setting up MySQL database:
1. start up MAMP
2. access database using gui (phpmyadmin, sequel pro etc..)
3. connect to your mysql database - note the address , usr name pw
4. create a new database - make sure you note the name

Setting up Node Files
6. open terminal and move to the application directory
 ```bash
 $ cd [your path to this folder]/SIMPLE_TO_DO_APP
 ```
7. if no **_package.json_** initialize node package & install modules
```bash
$ npm init
// follow prompts / hit enter
// next install node modules and save them to package.json as dependencies
$ npm install mysql express body-parser --save
```
8. Open **_build__db.js_** & **_app.js_** in txt editor & Add database connection details

Running build Database Script (build_db.js)

9. open terminal in root of app directory
```bash
$ cd [your path to this folder]/SIMPLE_TO_DO_APP
//run script; w/ node or nodemon
$ node build_db.js
```
If successful should see response in terminal & if you refresh GUI you should be able to see your new tables in your database!

Running API / Application server:

9. open terminal in root of app directory
```bash
$ cd [your path to this folder]/SIMPLE_TO_DO_APP
//run script; w/ node or nodemon
$ nodemon app.js
```


## LET'S GET STARTED!

### 1.
DESIGN DATABASE  
- tables
- relationships
- attributes & VALUES
- constraints: keys(PK, FK)
*****
PUT PICTURE / DIAGRAM here
*****
### 2.
WRITE UP IN SQL SYNTAX
- Testing w/ a GUI can be helpful to debug / do instantly

### 3.
CREATE build_db.js script to build your database using the sql syntax you just created
- create folder & build file
- terminal go to folder you just created and init node package & install node modules
```bash
$ cd path_to_your_directory/SIMPLE_TO_DO_APP
$ npm init
// follow prompts / hit enter
// next install node modules and save them to package.json as dependencies
$ npm install mysql express body-parser --save
```

- open build_db.js in a text editor

DO I NEED THIS???? MAYBE JUST RUN AND COMMENT WELL THEN COPY THE COMMENTS!!!!



---
## LINKS / RESOURCES
#### REST(ful) / HTTP etc..
   http://www.restapitutorial.com/lessons/httpmethods.html  

#### MYSQL

#### DATABASES DESIGN - LOGIC ETC (FIND THAT TABLE)
