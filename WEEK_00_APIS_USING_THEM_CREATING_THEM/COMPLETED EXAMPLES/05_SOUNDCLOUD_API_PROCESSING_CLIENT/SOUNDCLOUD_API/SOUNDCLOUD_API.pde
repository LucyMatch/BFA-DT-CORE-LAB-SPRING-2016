import http.requests.*;

public void setup(){
  
  size(400,400);
  
  //build our uri
  String client_id = "c6c9a1c45f2c0486826f0e2fdc83c2d1";
  String host = "http://api.soundcloud.com/";
  String path = "tracks/";
  String query = "ladygaga";
  
  //String uri = host + path + '?q=' + q + '&client_id=' + client_id;
  
  //create your GetRequest object 
  GetRequest get = new GetRequest(host + path + "?q=" + query + "&client_id=" + client_id);
  //send your request
  get.send();
  
  //print the results to the console
  println("Response Content:" + get.getContent());
  
}