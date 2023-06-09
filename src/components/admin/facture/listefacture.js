import FactureElment from './factureElement'
import React, { useContext, useEffect, useState } from 'react';
import JwtKeyContext from '../../context/JwtKeyContext';



function ListeFacture(props) {

  const [APIData, setAPIData] = useState([]);
  const jwtKey = useContext(JwtKeyContext);
  const fetchData = () => {
    fetch("http://127.0.0.1:8089/api/facture", {
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


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul className="responsive-table">
      <li className="table-header">
        <div className="col col-1">ID</div>
        <div className="col col-2">N facture</div>
        <div className="col col-3">Date</div>
        <div className="col col-4">Client</div>
        <div className="col col-6">ACTIONS</div>
      </li>

      
            <FactureElment  />
          

    </ul>
  )

} 

export default ListeFacture