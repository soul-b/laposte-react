import FactureElment from './factureElement'
import React, { useContext, useEffect, useState } from 'react';
import JwtKeyContext from '../../context/JwtKeyContext';
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import ClientElment from "../client/clientElement";
import LoadingIndicator from "../../utils/LoadingIndicator";



function ListeFacture({doChanging,changing}) {

  const [facturesData, setFacturesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const retryFetch = () => {
    doChanging();
    setError(null);
  }

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
        .then((response) => {
          if (!response.ok) {
            throw new Error('Server not responding');
          }
          return response.json()
        })
        .then((data) => {
          setFacturesData(data);
          console.log(data)
          setIsLoading(false);
        }).catch((error) => {
      setError('Les donnes ne peut pas etre recuperé, ressayer plus tard');
      console.error('NetworkError:', error);
    });
  };


  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [changing]);

  return (
    <ul className="responsive-table">
      <li className="table-header">
        <div className="col col-1">ID</div>
        <div className="col col-2">N facture</div>
        <div className="col col-3">Date</div>
        <div className="col col-4">Client</div>
        <div className="col col-6">ACTIONS</div>
      </li>
      {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

      {!isLoading && Object.keys(facturesData).length > 0 && !error && facturesData.map((factureData) => (
              <FactureElment factureData={factureData} doChanging={doChanging}/>
          )
      )}
      {!error && <LoadingIndicator isLoading={isLoading}/>}
    </ul>
  )

} 

export default ListeFacture