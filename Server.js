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
        console.log("Connected!");
        client.subscribe("/IotaTransaction")
    }

    // Connect the client, providing an onConnect callback
    client.connect({
        onSuccess: onConnect
    });
    
}

client.onMessageArrived = function (message) {
  console.log("Message Arrived: " + message.payloadString);
  console.log("Topic:     " + message.destinationName);
  console.log("QoS:       " + message.qos);
  console.log("Retained:  " + message.retained);
  // Read Only, set if message might be a duplicate sent from broker
  console.log("Duplicate: " + message.duplicate);
}
