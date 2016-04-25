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
            data: 'Sending some random request data'
        }, function(results){
            //results will hold the returned information from the API
            console.log("results from API:");
            console.log(results);
        });
    });

    //Send a message through /myApi/message and get a response
    //When the submit button is pressed
    $('#btnSubmit').off('click').on('click', function(){

        //assign the input value to a var
        var iptMsg = $("#iptMessage").val();

        //Lets send our input to the api and get a response
        $.get('/myApi/message', {
            query: iptMsg
        }, function(results){
            //results will hold the returned information from the API
            console.log("results from API:");
            console.log(results);

            //lets assign the results to a var
            var print = '<h1>' + results.data + '</h1>';

            //lets render it on the page
            $('.messageContainer').html(print);
        });
    });
}

//execute application initialization when the DOM loads
$(window).on('load', function(){
    app.init();
});
