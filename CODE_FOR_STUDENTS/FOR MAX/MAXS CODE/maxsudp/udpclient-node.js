var PORT = 2811;
var HOST = '192.168.0.102';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');


client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);

});

client.on('message', msg => {
  console.log('Received: '+ msg +'');
});

// client.close();

// client.on('message', (msg, rinfo) => {
//   console.log('Received %d bytes from %s:%d\n',
//               msg.length, rinfo.address, rinfo.port);
// });
