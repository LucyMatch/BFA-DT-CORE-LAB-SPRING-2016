/*
This application willget information from the SoundCloud Api
using the pure HTTP reference, not an SDK
*/

var request = require('request');   //simplifies HTTP Communication

// we need a sound cloud API key in order to request from the Api
// This is my Key - please use in this scenario only
var SC_KEYS = {
  id: 'c6c9a1c45f2c0486826f0e2fdc83c2d1',
  secret: 'e252aa5fca47ba09effbf23c0762cd04'
}

//build our URI
//request all tracks with the title q
//https://developers.soundcloud.com/docs/api/reference#tracks
var host = '';
var path = '';
var q = '';

//http://api.soundcloud.com/tracks/?q=lady gaga&client_id=c6c9a1c45f2c0486826f0e2fdc83c2d1
var uri = host + path + '?q=' + q + '&client_id=' + SC_KEYS.id;

//send the request
request.get(uri, function(error, response, body){

})
