import Employe from './employeElement.js'
import './../styles/listeemployes.css'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';

function Listeemployes(props) {


  const [APIData, setAPIData] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8088/api/client`)
  //     .then((response) => {
  //       setAPIData(response.data);
  //     })
  // }, [props.isReload])


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = () => {
    fetch("http://127.0.0.1:8089/api/employe", {
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
        <div className="container_l">
  
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">ID</div>
            <div className="col col-2">NOMS</div>
            <div className="col col-3">PRENOMS</div>
            <div className="col col-4">MAIL</div>
            <div className="col col-5">TELEPHONE</div>
            <div className="col col-6">ACTIONS</div>
          </li>
         
        </ul>
        {Object.keys(APIData).length > 0 &&
        APIData.map((data) => {
          return (
            <Employe data={data} />
          )
        }
        )}
        
      </div>
        
        
      )
}
  
export default Listeemployes