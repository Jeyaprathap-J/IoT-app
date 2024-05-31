import React, { useState, useEffect } from 'react';

function App() {
  const [serialData, setSerialData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/serial-data');
        const result = await response.json();
        setSerialData(result.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Serial Port Data</h1>
        <p>{serialData}</p>
      </header>
    </div>
  );
}

export default App;
