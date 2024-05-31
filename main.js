var serialport = require("serialport");
var Serialport = serialport.Serialport;
var portName = "COM3";

var myPort = new Serialport(portName,{
    baudRate: 9600,
    parser:serialport.parsers.Readline("\r\n")
})

myPort.on('open',onOpen);
myPort.on('data',onData);

function onOpen(){
    console.log("Open connection");
}

function onData(data){
    console.log("on Data" +data);
}