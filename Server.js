MQTTConnect();

function MQTTConnect() {
    // Create a client instance: Broker, Port, Websocket Path, Client ID
    client = new Paho.MQTT.Client("iot.eclipse.org", Number(80), "/ws", "2");

    // set callback handlers
    client.onConnectionLost = function (responseObject) {
        console.log("Connection Lost: "+responseObject.errorMessage);
    }

    client.onMessageArrived = function (message) {
        console.log("Message Arrived: "+message.payloadString);
    }

    // Called when the connection is made
    function onConnect(){
        client.subscribe("/IotaTransaction");
        var div = document.getElementById("log");
        div.innerHTML += "Connected!" + "<br />" + "<br />";
    }

    // Connect the client, providing an onConnect callback
    client.connect({
        onSuccess: onConnect
    });
    
}

client.onMessageArrived = function (message) {
  var div = document.getElementById("log");
  div.innerHTML += "Message Arrived: " + message.payloadString + "<br />";
  div.innerHTML += "Topic:     " + message.destinationName + "<br />";
  div.innerHTML += "QoS:       " + message.qos + "<br />";
  div.innerHTML += "Retained:  " + message.retained + "<br />";
  // Read Only, set if message might be a duplicate sent from broker
  div.innerHTML += "Duplicate: " + message.duplicate + "<br />" + "<br />";
}
