import React, { useState, useEffect } from 'react';

function App() {
  const [serialData, setSerialData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/WeatherMonitor/Get_Data');
        const result = await response.json();
        console.log("Result",result);
        setSerialData(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    // fetchData();
    setInterval(() => {
      fetchData();
 }, 1000);    
 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Serial Port Data</h1>
        {serialData && serialData.length > 0 ? (
            <table className="table table-striped table-hover w-100 vw-table">
              <thead>
                <tr>
                  <th className="text-center">
                    <strong>Temperature</strong>
                  </th>
                  <th></th>
                  <th className="text-center">
                    <strong>Pressure</strong>
                  </th>
                  <th></th>
                  <th className="text-center">
                    <strong>Wind Speed</strong>
                  </th>
                  <th></th>
                  <th className="text-center">
                    <strong>Wind Direction</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {serialData
                  .map((data) => (
                    <tr key={data.id}>
                      <td align="center">{data.Temperature}</td><td></td>
                      <td align="center">{data.Pressure}</td><td></td>
                      <td align="center">{data.Wind_Speed}</td><td></td>
                      <td align="center">{data.Wind_Direction}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ):""}
      </header>
    </div>
  );
}

export default App;
