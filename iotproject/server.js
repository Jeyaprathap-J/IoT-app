const express = require('express');
const cors = require('cors');  // Import the cors middleware
const bodyParser = require('body-parser');
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

const app = express();
const port = 3001; // Server port

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json());

const serialPort = new SerialPort({
    path:'COM3',
    baudRate: 9600 
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}));

// Endpoint to receive data from React app and send it to Arduino
app.post('/send-data', (req, res) => {
    const { data } = req.body;
    serialPort.write(data + '\n', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to send data' });
      }
      res.status(200).json({ message: 'Data sent successfully' });
    });
  });

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
});

parser.on('data', (data) => {
    console.log(data);
});

serialPort.on('error', (err) => {
    console.error('Error:', err.message);
});