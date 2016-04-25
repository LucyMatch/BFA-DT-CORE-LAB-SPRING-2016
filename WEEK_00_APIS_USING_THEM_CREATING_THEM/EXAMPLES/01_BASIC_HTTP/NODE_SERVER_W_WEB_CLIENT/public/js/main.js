//an object for our application
var app = {};

app.init = function() {
    console.log('initilizing application');
    this.attachEvents();
};

//A function where we will keep all user interaction listeners i.e buttons
app.attachEvents = function() {

    //Ping Api button
    $('#btnPingServer').off('click').on('click', function(){
        //AJAX CALL TO API (OUR NODE SERVER)
        $.get('/myApi', {
            //what you're sending goes here
        }, function(results){
            //Do the stuff with results
        });
    });

    //Send a message through /myApi/message and get a response
    //When the submit button is pressed
    $('#btnSubmit').off('click').on('click', function(){
        
    });

}

//execute application initialization when the DOM loads
$(window).on('load', function(){
    app.init();
});
