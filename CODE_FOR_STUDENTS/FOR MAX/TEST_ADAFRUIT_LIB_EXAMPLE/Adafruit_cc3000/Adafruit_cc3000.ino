/// ADAFRUIT_CC3000
//https://learn.adafruit.com/downloads/pdf/adafruit-cc3000-wifi.pdf
//https://github.com/adafruit/Adafruit_CC3000_Library

#include <Adafruit_CC3000.h> //
#include <ccspi.h> // need?
#include <SPI.h> // need?
#include <string.h> // need?
#include "utility/debug.h" // need?

// OR USE APP!!!!!
#define WLAN_SSID "myNetwork" // cannot be longer than 32 characters!
#define WLAN_PASS "myPassword"

// Security can be WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2
#define WLAN_SECURITY WLAN_SEC_WPA2

unsigned int port = 2390;       // local port
IPAddress remoteIp = 'REMOTE_IP';     // Remote Ip to Send to

char sendBuffer[] = "YO YO YO SENDING THIS!"; // MSG TO SEND

//Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT,SPI_CLOCK_DIVIDER); // you can change this clock speed but DI



Adafruit_CC3000_Client client;        // FOR UDP

void setup(void)
{
  Serial.begin(115200);
  Serial.println(F("CC3000!\n"));

  /* Initialise the module */
  Serial.println(F("\nInitialising the CC3000 ..."));
  if (!cc3000.begin())
  {
    Serial.println(F("Unable to initialise the CC3000! Check your wiring?"));
    while(1);
  }

  //Get Mac address
  displayMACAddress();

  /* Delete any old connection data on the module */
  Serial.println(F("\nDeleting old connection profiles"));
  if (!cc3000.deleteProfiles()) {
    Serial.println(F("Failed!"));
    while(1);
  }

  //Manually set Ip // only need to call once
  uint32_t ipAddress = cc3000.IP2U32(192, 168, 1, 19);
  uint32_t netMask = cc3000.IP2U32(255, 255, 255, 0);
  uint32_t defaultGateway = cc3000.IP2U32(192, 168, 1, 1);
  uint32_t dns = cc3000.IP2U32(8, 8, 4, 4);
  if (!cc3000.setStaticIPAddress(ipAddress, netMask, defaultGateway, dns)) {
    Serial.println(F("Failed to set static IP!"));
    while(1);
  }

  //TURN AUTO / DHCP BACK ON IF MANUAL DOSN'T WORK
  // if (!cc3000.setDHCP()) {
  //   Serial.println(F("Failed to set DHCP!"));
  //   while(1);
  // }

} // END OF SET UP

void loop() {

  /// CONNECT UDP
  if(!client.connected()){
    Serial.print(F("going to connect"));
    client = cc3000.connectUDP(remoteIp, port);
  }

  //if connected send UDP BUFFER
  if(client.connected()) {
    Serial.print(F("connected! now going to send req: "));
    client.write(sendBuffer, sizeof(sendBuffer));
  }else {
    Serial.print(F("NOT CONNECTED"));
  }
}

/**************************************************************************/
/*
    CONNECTION FUNCTIONS
*/
/**************************************************************************/

void AccessPointConnect() {
    char *ssid = WLAN_SSID;             /* Max 32 chars */
    Serial.print(F("\nAttempting to connect to ")); Serial.println(ssid);

    if (!cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY)) {
      Serial.println(F("Failed!"));
      while(1);
    }
    Serial.println(F("Connected!"));

    ////if manual setting of IP doesn't work
    ///* Wait for DHCP to complete */
    // Serial.println(F("Request DHCP"));
    // while (!cc3000.checkDHCP())
    // {
    //   delay(100);
    // }

    /* Display the IP address DNS, Gateway, etc. */
    // IP addr: 192.168.1.23
    // Netmask: 255.255.255.0
    // Gatway: 192.168.1.1
    // DHCPsrv: 192.168.1.1
    // DNSserv: 192.168.1.1
    // WIll Need for Application that will be listening Node // Processing...
    while (! displayConnectionDetails()) {
      delay(1000);
    }
    return;

}

/**************************************************************************/
/*
    UTILTY FUNCTIONS FROM BUILDTEST.ino EXAMPLE FROM ADAFRUIT CC3000 LIBRARY
*/
/**************************************************************************/

bool displayConnectionDetails(void)
{
  uint32_t ipAddress, netmask, gateway, dhcpserv, dnsserv;

  if(!cc3000.getIPAddress(&ipAddress, &netmask, &gateway, &dhcpserv, &dnsserv))
  {
    Serial.println(F("Unable to retrieve the IP Address!\r\n"));
    return false;
  }
  else
  {
    Serial.print(F("\nIP Addr: ")); cc3000.printIPdotsRev(ipAddress);
    Serial.print(F("\nNetmask: ")); cc3000.printIPdotsRev(netmask);
    Serial.print(F("\nGateway: ")); cc3000.printIPdotsRev(gateway);
    Serial.print(F("\nDHCPsrv: ")); cc3000.printIPdotsRev(dhcpserv);
    Serial.print(F("\nDNSserv: ")); cc3000.printIPdotsRev(dnsserv);
    Serial.println();
    return true;
  }
}
