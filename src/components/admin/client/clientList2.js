import './styles/clientList2.css'
import ClientElment from './clientElement'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';



function ClientList2(props) {
  const [APIData, setAPIData] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8088/api/client`)
  //     .then((response) => {
  //       setAPIData(response.data);
  //     })
  // }, [props.isReload])


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = () => {
    fetch("http://127.0.0.1:8089/api/client", {
      method: "get",
      headers: {
        'Authorization': `Bearer ${jwtKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      })
      .then((response) => response.json())
      .then((data) => setAPIData(data));
  };

 
//  const postData = () => {
//       fetch("http://127.0.0.1:8089/api/client/", {
//         method: "post",
//         headers: {
//           'Authorization': `Bearer ${jwtKey}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
      
//         //make sure to serialize your JSON body
//         body: JSON.stringify({
//           nom: "Client 666",
//           tel: 6666666,
//           email: "6666@example.com",
//           adresse: "Adresse client 666",
//         })
//       })
//       .then( (response) => { 
//          //do something awesome that makes the world a better place
//          console.log(response)
//       });
//   };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul className="responsive-table">
      <li className="table-header">
        <div className="col col-1">ID</div>
        <div className="col col-2">Nom</div>
        <div className="col col-3">Mail</div>
        <div className="col col-4">Adresse</div>
        <div className="col col-5">Téléphone</div>
        <div className="col col-6">ACTIONS</div>
      </li>

      {Object.keys(APIData).length > 0 &&
        APIData.map((data) => {
          return (
            <ClientElment data={data} />
          )
        }
        )}

    </ul>
  )

} 

export default ClientList2