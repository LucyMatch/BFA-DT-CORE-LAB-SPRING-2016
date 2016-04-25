// UDP CC300 WIFI BOARD SEND PACKET EXAMPLE W/
// https://github.com/jiahuang/CC3000 lib

#include <SPI.h>
#include <CC3000.h>

/**************************************************************************/
/*
    CONNECTION DETAILS
*/
/**************************************************************************/

// int status = WL_IDLE_STATUS;
char ssid[] = "...";                 // your network SSID (name)
char pass[] = "...";                 // your network password (use for WPA, or use as key for WEP)

unsigned int port = 2390;       // local port
IPAddress remoteIp = 'REMOTE_IP';     // Remote Ip to Send to

char sendBuffer[] = "YO YO YO SENDING THIS!"; // MSG TO SEND

WiFiDatagram Udp;

void setup ()
{
  Serial.begin(9600);

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while(true);
  }

// CONNECT TO WIFI
  while ( WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);

    WiFi.begin(ssid, pass);
  }

  //PRINT WIFI DETAILS
  Serial.println("Connected to wifi");
  printWifiStatus();

  Serial.println("\nStarting connection to server...");
  // if you get a connection, report back via serial:
  Udp.begin(port);

} // END OF setup

void loop() {
  //keep looping and calling the send data function
  sendUDP(sendBuffer);
}

/**************************************************************************/
/*
    UDP FUNCTIONS 2 SEND
*/
/**************************************************************************/

void sendUDP(char data_to_send[]) {

  Serial.println("data to send via UDP: ");
  Serial.println(data_to_send);
  Serial.println("TO THIS LOCATION");
  Serial.println(remoteIp);
  Serial.println(port);

  // Udp.send(ip_sending_to, port_Server_listening_at, BufferData, BUffer_data_length)

  Udp.send(remoteIp, port, data_to_send, strlen(data_to_send));
}

/**************************************************************************/
/*
    UDPUTIL FUNC FROM LIB EXAMPLES
*/
/**************************************************************************/

void printWifiStatus ()
{
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
