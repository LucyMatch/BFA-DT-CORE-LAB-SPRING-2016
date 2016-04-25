#ifndef UDPCLIENT_H
#define UDPCLIENT_H


#include <Arduino.h>


#include "Adafruit_CC3000.h"
#include "utility/socket.h"

class UDPClient
{
  private:
     uint16_t _port;
     int _socket;

  public:
      UDPClient(uint16_t port);

      bool Reboot();
      bool createSocket();
      int sendMessage(char *buffer, int bufferSize);
};
#endif
