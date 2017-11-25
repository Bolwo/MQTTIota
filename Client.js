
var logDiv = document.getElementById('log');

MQTTConnect();

function MQTTConnect() {
    // Create a client instance: Broker, Port, Websocket Path, Client ID
    client = new Paho.MQTT.Client("iot.eclipse.org", Number(80), "/ws", "1");

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
        PublishMessage();
    }

    // Connect the client, providing an onConnect callback
    client.connect({
        onSuccess: onConnect
    });
}

function SendMessage() {
    PublishMessage();
}

function PublishMessage(){
    // Publish a Message
    var message = new Paho.MQTT.Message("Test payload, identifier here");
    message.destinationName = "/IotaTransaction";
    message.qos = 1;

    client.send(message);
}
