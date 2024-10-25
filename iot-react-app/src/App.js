import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rt_data from './component/rt_data';

class App extends Component {
  render() {

    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global PUBLIC_URL */
    //const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

    return (
        <BrowserRouter>
            <Rt_data />
        </BrowserRouter>
    );

  }
}

export default App;

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [serialData, setSerialData] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8001/WeatherMonitor/Get_Data');
//         const result = await response.json();
//         console.log("Result",result);
//         setSerialData(result);
//       } catch (error) {
//         console.error('Error fetching data', error);
//       }
//     };

//     // fetchData();
//     setInterval(() => {
//       fetchData();
//     }, 1000);    
 
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Serial Port Data</h1>
//         {serialData && serialData.length > 0 ? (
//             <table className="table table-striped table-hover w-100 vw-table">
//               <thead>
//                 <tr>
//                   <th className="text-center">
//                     <strong>Temperature</strong>
//                   </th>
//                   <th></th>
//                   <th className="text-center">
//                     <strong>Pressure</strong>
//                   </th>
//                   <th></th>
//                   <th className="text-center">
//                     <strong>Wind Speed</strong>
//                   </th>
//                   <th></th>
//                   <th className="text-center">
//                     <strong>Wind Direction</strong>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {serialData
//                   .map((data) => (
//                     <tr key={data.id}>
//                       <td align="center">{data.Temperature}</td><td></td>
//                       <td align="center">{data.Pressure}</td><td></td>
//                       <td align="center">{data.Wind_Speed}</td><td></td>
//                       <td align="center">{data.Wind_Direction}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           ):""}
//       </header>
//     </div>
//   );
// }

// export default App;
