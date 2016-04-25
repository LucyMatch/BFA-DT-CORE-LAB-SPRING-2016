var app = {};

//init application
app.init = function() {
    console.log("Initializing Application!");
    // //initialise hash router
    hashRouter();
    // //Refresh Hash so we start fresh
    location.hash = '';
    // // we want to display a list of all tasks as a
    // // "home page" so lets change # to #tasks
    location.hash = '#tasks';
}

/* H A S H  R O U T E R */
var hashRouter = function() {
    $(window).off('hashchange').on('hashchange', function(){
        console.log('Current hash is ' + location.hash );
    //     //we have two pages - tasks & create task
        if(location.hash == '#tasks') {
            renderTasks();
        }else if(location.hash == "#create"){
            renderCreate();
        }
        attachEvents();
    });
}

/* E V E N T S */
var attachEvents = function() {
    // console.log("Attached Events  ( ͡° ͜ʖ ͡°)");
    //create button in footer
    $('#btnCreate').off('click').on('click', function(){
        location.hash = '#create';
    });
    //submit button
    $('#btnSubmit').off('click').on('click', function(){
          var title = $('#iptTaskTitle').val();
          var description = $('#iptTaskDescription').val();

          var data = {
            t: title,
            d: description
          };

          $.post('/task', data , function(res){
              console.log(res);
              location.hash = "#tasks";
          });
    });
    //delete button
    $('.btnDelete').off('click').on('click', function(){
        // var that = this;
        // //send request to server to delete the project from the JSON data file
        // $.ajax({
        //     url: '/task',
        //     type: 'DELETE',
        //     data: {
        //       id: $(this).siblings().attr('data-id')
        //     },
        //     success: function(result){
        //       $(that).parent().slideUp(function(){
        //           location.reload();
        //       });
        //     }
        // });
    });
};

/* R E N D E R E R  F U N C T I O N S */
var renderTasks = function() {
  // //Fetch Tasks from JSON file - REQuest from the Server using the GET method
  $.get('/tasks', {
      data: 'Get All THE Tasks'
  }, function(results){
      console.log(results); // ---> data from server
  //     //now let's compile the template
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
      title: 'LUCY IS THE BEST'
  });
  // //render the template to the #app-container
  $('#app-container').html(compiled);
}

app.init();
