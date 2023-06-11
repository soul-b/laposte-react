import './styles/clientList2.css'
import ClientElment from './clientElement'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';
import LoadingIndicator from "../../utils/LoadingIndicator";
import ServerErrorComponent from "../../utils/ServerErrorComponent";



function ClientList2({changing,doChanging}) {
  const [APIData, setAPIData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const retryFetch = () => {
    doChanging();
    setError(null);
  }

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server not responding');
        }
        return response.json()
      })
      .then((data) => {
        setAPIData(data);
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
        <div className="col col-2">Nom</div>
        <div className="col col-3">Mail</div>
        <div className="col col-4">Adresse</div>
        <div className="col col-5">Téléphone</div>
        <div className="col col-6">ACTIONS</div>
      </li>
      {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

      {!isLoading && Object.keys(APIData).length > 0 && !error && APIData.map((data) => (
                <ClientElment data={data} doChanging={doChanging}/>
          )
        )}
      {!error && <LoadingIndicator isLoading={isLoading}/>}

    </ul>
  )

} 

export default ClientList2