import React, { useState, useEffect } from 'react';

function App() {
  const [serialData, setSerialData] = useState('');
  var [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:44342/api/Communication/Receive`);
      const result = await response.json();
      console.log(result.status);
      setSerialData(result.status);
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
      const res = await fetch(`https://localhost:44342/api/Communication/Send?data=${inputData}`);
      const result = await res.json();
      console.log(result.status);
      setResponse(result.status);

      if(inputData === "OFF"){
        inputData = "ON";
        setInputData("ON");
      }
      else{
        inputData = "OFF";
        setInputData("OFF");
      }

    } catch (error) {
      setResponse('Error sending data');
      console.error('Error:', error);
    }

    fetchData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication Between Arduino UNO and React application</h1>
        <p>{serialData}</p>
        <button onClick={fetchData}>Fetch</button>
        <form onSubmit={handleSubmit}>
          <button
          type="submit">{(inputData === "ON")? 'Turn ON' : 'Turn OFF'}</button>
        </form>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
