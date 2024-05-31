const express = require('express');
const cors = require('cors');  // Import the cors middleware
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

const app = express();
const port = 3001; // Server port

// Use the cors middleware
app.use(cors());

const serialPort = new SerialPort({
    path:'COM3',
    baudRate: 9600 
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}));

// Endpoint to get data from the serial port
app.get('/serial-data', (req, res) => {
    parser.once('data', (data) => {
      res.json({ data });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

serialPort.on('open', () => {
    console.log('Arduino UNO is Connected Successfully!');
    console.log('Fetching Data...');
});

parser.on('data', (data) => {
    console.log('Received data:',data);
});

serialPort.on('error', (err) => {
    console.error('Error:', err.message);
});