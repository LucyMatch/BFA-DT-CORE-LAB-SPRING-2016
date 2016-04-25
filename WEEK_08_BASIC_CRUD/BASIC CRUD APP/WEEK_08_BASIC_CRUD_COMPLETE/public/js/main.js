var app = {};

//init application
app.init = function() {
    console.log("Initializing Application!");
    //initialise hash router
    hashRouter();
    //Refresh Hash so we start fresh
    location.hash = '';
    // we want to display a list of all tasks as a
    // "home page" so lets change # to #tasks
    location.hash = '#tasks';
}

/* H A S H  R O U T E R */
// This function will detect the change of '#' on the browser address field
// location.hash is inBuilt in the standard set of Web Api's
// https://developer.mozilla.org/en-US/docs/Web/API
// 'hashchange' <-- is a Jquery function that watches for these changes
// to see Go to a web page + open the Javascript Console and type location
// - this will display the location object that is associated with that page
var hashRouter = function() {
    $(window).off('hashchange').on('hashchange', function(){
        console.log('Current hash is ' + location.hash );
        //we have two pages - tasks & create task
        if(location.hash == '#tasks') {
            renderTasks();
        }else if(location.hash == "#create"){
            renderCreate();
        }
        attachEvents();
    });
}

/* E V E N T S */
//A function for all user interaction event listeners
var attachEvents = function() {
    console.log("Attached Events  ( ͡° ͜ʖ ͡°)");

    //create button in footer
    $('#btnAdd').off('click').on('click', function(){
        //when the create button is pressed we wanna go to the create page!
        location.hash = '#create';
    });
    //submit button
    //Will send a POST request to our Server through the route we made
    // for creating tasks!
    $('#btnSubmit').off('click').on('click', function(){
          // When someone creates a task and hits Submit we want to send this to our Server
          // this will go through the '/task' route and will send a POST method
          //first assign input values to variables
          var title = $('#iptTaskTitle').val();
          var description = $('#iptTaskDescription').val();

          $.post('/task', {
              //what we want to post / send to the Server as a req
              task_title : title,
              task_description : description
          }, function(res){
              //response from the server will be in res
              console.log(res);
              //Now lets navigate back to our "home"
              location.hash = "#tasks"
          });
    });
    //delete button
    //Will send a DELETE request through the route we create on our server to DELETE a task
    $('.btnDelete').off('click').on('click', function(){
        var that = this;
        //send request to server to delete the project from the JSON data file
        $.ajax({
            url: '/task',
            type: 'DELETE',
            data: {
              id: $(this).siblings().attr('data-id')
            },
            success: function(result){
              // delete the task item from the rendered HTML view
              $(that).parent().slideUp(function(){
                  location.reload();
              });
            }
        });
    });
};

/* R E N D E R E R  F U N C T I O N S */
var renderTasks = function() {
  //Fetch Tasks from JSON file - REQuest from the Server using the GET method
  $.get('/tasks', {
      data: 'Get All THE Tasks'
  }, function(results){
      console.log(results); // ---> data from server
      //now let's compile the template
      var tplToCompile = $('#tpl_tasks').html();
      var compiled = _.template(tplToCompile, {
          title: 'DO THESE TASKS!',
          data: results.data
      });
      $('#app-container').html(compiled);
      console.log("RENDERED PROJECTS :)");
      //Want to attach events to the Tasks page so that we can use the delete btn
      attachEvents();
  })
}

var renderCreate = function() {
  //when compiling an underscore template - similar method to other templating frameworks
  //Assign the html template to a varibale using JQuery & it's #id
  var tplToCompile = $('#tpl_create').html();
  var compiled = _.template(tplToCompile, {
      title: 'TO DO APP'
  });
  //render the template to the #app-container
  $('#app-container').html(compiled);
}

app.init();
