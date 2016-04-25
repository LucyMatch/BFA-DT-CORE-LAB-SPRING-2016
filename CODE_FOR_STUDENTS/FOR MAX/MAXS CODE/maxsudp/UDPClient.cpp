#include "UDPClient.h"



UDPClient::UDPClient(uint16_t port) {
  _port = port;
  _socket = -1;
}

bool UDPClient::Reboot()
{
    if (_socket != -1)
    {
        int closeInt = closesocket(_socket);
        if (closeInt == -1)
        {
            Serial.println("Reboot() call failed");
            return false;
        }
        _socket = -1;
    }
    delay(400);
    createSocket();
}

bool UDPClient::createSocket() {
    if (_socket == -1) {
        int soc = socket(AF_INET, SOCK_DGRAM, 0);
        if (soc < 0) {
          Serial.println("Socket() call failed");
          return false;
        }

        sockaddr_in myaddr;
        memset(&myaddr, 0, sizeof(myaddr));
        myaddr.sin_family = AF_INET;
        myaddr.sin_port = htons(0);
        myaddr.sin_addr.s_addr = 0000000000000000000000000000000000000000;

        int tryBind = bind(soc, (sockaddr *)&myaddr, sizeof(myaddr));
        if (tryBind < 0) {
          Serial.println("Bind() call failed");
          return false;
        } else {
          Serial.println("Bind() UDP OK");
        }

        _socket = soc;
    }

    Serial.print("END of createSocket() _socket: "); Serial.println(_socket);
    return true;
}





int UDPClient::sendMessage(char *buffer, int bufferSize) {

    sockaddr_in sa;
    memset(&sa, 0, sizeof(sa));
    sa.sin_family = AF_INET;
    sa.sin_port = htons(_port);
    // sa.sin_addr.s_addr = 11000000101010000000000001100110;
    // sa.sin_addr.s_addr = inet_addr("132.241.5.10");
    sa.sin_addr.s_addr = 10101100000101000000101000000011;


    int n = sendto(_socket, buffer, bufferSize, 0, (sockaddr*)&sa, sizeof(sa));
    Serial.println(n);
    if (n < 1)  {
        // Error sending data.
        Serial.print("Error sending data: ");
        Serial.println(n);
        return -1;
    }

    return n;
}
