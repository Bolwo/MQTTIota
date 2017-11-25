
var logDiv = document.getElementById('log');

MQTTConnect();
var iota = IotaConnect();

function IotaConnect(){
   return new IOTA({
        'provider': 'http://service.iotasupport.com:14265'
    });
    iota.api.getNodeInfo(function(error, success) {
        if (error) {
            console.error(error);
        } else {
            console.log(success);
        }
    }) 
}

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
    }

    // Connect the client, providing an onConnect callback
    client.connect({
        onSuccess: onConnect
    });
}

function SendMessage() {
    var id = "Test message 123"
    PublishMQTTMessage(id);
    CreateIotaTransaction(id);
}

function PublishMQTTMessage(id){
    // Publish a Message
    var message = new Paho.MQTT.Message(id);
    message.destinationName = "/IotaTransaction";

    client.send(message);
}

function CreateIotaTransaction(id){
    // the message which we will send with the transaction
    var messageToSend = {
        'name': '/IotaTransaction',
        'message': id
    }
    // Stringify to JSON 
    var messageStringified = JSON.stringify(messageToSend);
    // Convert the string to trytes 
    var messageTrytes = iota.utils.toTrytes(messageStringified);

    var transfer = [{
        'address': "HZPUPWANZVOLX9ALPHUSDMIJJLFWABTOGY9UPLQRCFFOMOWJCKUETHEIIQRPREXYXJDOIOPROU9HIHDXD",
        'value': 0,
        'message': messageTrytes
    }]
    // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
    iota.api.sendTransfer("ABCDEFG", 4, 18, transfer, function(e, bundle) {
        if (e) throw e;
        console.log("Successfully sent your transfer: ", bundle);
})
}
