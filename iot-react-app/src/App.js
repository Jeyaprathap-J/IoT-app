import React, { useState, useEffect } from 'react';

function App() {
  const [serialData, setSerialData] = useState('');
  var [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/serial-data');
      const result = await response.json();
      setSerialData(result.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect( () => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(serialData.includes("OFF")){
        inputData = "ON";
        setInputData("ON");
      }
      else{
        inputData = "OFF";
        setInputData("OFF");
        console.log("ID",inputData);
      }
      const res = await fetch('http://localhost:3001/send-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });
      const result = await res.json();
      setResponse(result.message);
    } catch (error) {
      setResponse('Error sending data');
      console.error('Error:', error);
    }

    fetchData();
  };

  console.log("Verify first load", inputData, serialData, response);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication Between Arduino UNO and React application</h1>
        <p>{serialData}</p>
        <form onSubmit={handleSubmit}>
          <button 
          type="submit"
           >{serialData.includes("OFF")? 'Turn ON' : 'Turn OFF'}</button>
        </form>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
