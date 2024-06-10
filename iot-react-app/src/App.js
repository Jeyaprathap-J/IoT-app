import React, { useState, useEffect } from 'react';

function App() {
  const [serialData, setSerialData] = useState('');
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:44342/api/Communication/Receive`);
      const result = await response.json();
      console.log(result.data);
      setSerialData(result);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect( () => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);
    try {
      const res = await fetch(`https://localhost:44342/api/Communication/Send?data=${inputData}`);
      //const result = await res.json();
      setResponse(res.message);
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter data to send"
          />
          <button type="submit">Send</button>
        </form>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
