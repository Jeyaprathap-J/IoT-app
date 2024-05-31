const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

const port = new SerialPort({
    path:'COM3',
    baudRate: 9600 
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n'}));

port.on('open', () => {
    console.log('Serial port open');
});

parser.on('data', (data) => {
    console.log('Received data:',data);
});

port.on('error', (err) => {
    console.error('Error:', err.message);
});