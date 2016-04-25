#include <UDPClient.h>

#include <ccspi.h>
#include <SPI.h>
#include <string.h>
#include "utility/debug.h"


#define HOST_PORT_UDP 33333
UDPClient udpClient(HOST_PORT_UDP);

#define ADAFRUIT_CC3000_IRQ   3  // MUST be an interrupt pin!
// These can be any two pins
#define ADAFRUIT_CC3000_VBAT  5
#define ADAFRUIT_CC3000_CS    10
// Use hardware SPI for the remaining pins
// On an UNO, SCK = 13, MISO = 12, and MOSI = 11
Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT,
                                         SPI_CLOCK_DIVIDER);

#define WLAN_SSID       "iPhone"        // cannot be longer than 32 characters!
#define WLAN_PASS       "9512341234"
// Security can be WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2
#define WLAN_SECURITY   WLAN_SEC_WPA2
                                         
void setup() {
  Serial.begin(9600);

  Serial.println(F("\nInitialising the CC3000 ..."));
  if (!cc3000.begin())
  {
    Serial.println(F("Unable to initialise the CC3000! Check your wiring?"));
    while(1);
  }

  Serial.println(F("\nDeleting old connection profiles"));
  if (!cc3000.deleteProfiles()) {
    Serial.println(F("Failed!"));
    while(1);
  } else {
    Serial.println(F("#1 Succeeded!"));
  }

  if (!cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY)) {
    Serial.println(F("Failed!"));
    while(1);
  }
   
  Serial.println(F("Connected!"));
  
  /* Wait for DHCP to complete */
  Serial.println(F("Request DHCP"));
  while (!cc3000.checkDHCP())
  {
    delay(100); // ToDo: Insert a DHCP timeout!
  }  

  
  if (!udpClient.createSocket()) {
    Serial.println("udpClient doesn't start working");
  } else {
    Serial.println("#2 Succeeded");
  };
}

void sending(){       
    if (!udpClient.sendMessage("Hello", 5)) {
      Serial.println("failed to writeDATA");
    } else {
      Serial.println("succeeded to writeDATA");
    }
}

void loop() {
    if(cc3000.checkConnected()) {
      sending();
      delay(50);
    } else {
      cc3000.reboot();
       //here the code to connect to AP
      while(udpClient.Reboot() == 0);  
    }
}

