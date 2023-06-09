import './../styles/exportList.css'
import ExportElment from './exportElement'
import React, { useContext, useEffect, useState } from 'react';
import Ajouter_export from '../../forms/ajouter_export';

import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';
import LoadingIndicator from "../../utils/LoadingIndicator";
import Ajouter_import from "../../forms/ajouter_import";



function ExportList(props) {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCurrentDate,setPageCurrentDate] = useState('');

  const [maxPage, setMaxPage] = useState(0);

  const [changing, setChanging] = useState(1);


  const [groupedData ,setGroupedData ] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [isLoading, setIsLoading] = useState(true);


  function doChanging() {
    setChanging(changing + 1);
  }

  function handleNextPage() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      setSelectedClient(null);
    }
  }
  function handleLastPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedClient(null);
    }
  }



  const jwtKey = useContext(JwtKeyContext);
  const fetchData = (page) => {
   fetch("http://127.0.0.1:8089/api/exports?page="+page, {
    headers: {
      'Authorization': `Bearer ${jwtKey}`,
      'Content-Type': 'application/json'
    }
  })
      .then((response) => response.json())
      .then((data) => {
        setMaxPage(data.total_pages);
        // const sortedArray = (data.exports.sort((a, b) => a.client.id - b.client.id);
        setAPIData(data.exports.sort((a, b) => a.client.id - b.client.id));

        setGroupedData(data.exports.reduce((result, item) => {
          const clientId = item.client.id;
          if (!result[clientId]) {
            result[clientId] = [];
          }
          result[clientId].push(item);
          return result;
        }, {}));
        setClientList(Object.keys(groupedData));

        setSelectedClient(data.exports[0].client.id);

        setPageCurrentDate(data.exports[0].date.substring(0, 7));

        setIsLoading(false);
      });
  };

  useEffect(()=>{
    setIsLoading(true);
    fetchData(currentPage)
  },[currentPage,changing])

  useEffect(()=>{
    setClientList(Object.keys(groupedData));
  },[groupedData])

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
  };

  const getClientInfoById = (clientId,data) => {
    // Retrieve client info by ID
    const clientInfo = data.find(item => item.client.id == clientId);
    console.log("***********")
    console.log(clientInfo)
    return clientInfo ? clientInfo.client : null;
  };

  return (
    <>

      <div className="parametre">

        <select className='select_client' value={selectedClient} onChange={(e) => handleClientChange(e.target.value)}>
          <option value="">Select a client</option>
          {clientList.map((clientId) => (
              <option key={clientId} value={clientId}>
                {getClientInfoById(clientId,APIData) &&
                    getClientInfoById(clientId,APIData).nom}
              </option>
          ))}
        </select>

        <div ><Ajouter_export doChanging={doChanging} /></div>
      </div>


<div className="table">
    <div className="title">EXPORTS</div>
    <div className="sub-title">Poids des sacs</div>
    <div className="part">
      <div className="date">{pageCurrentDate}</div>
      <div className="sub-part">
        <div className="range">
          <h6>range_5</h6>
          <div className="sub-range"> 
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
        
            
          </div>
        <div className="range">
          <h6>range_10</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_15</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_20</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_25</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_30</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        
        
          
            
          </div>
          <div className="nb-total-sacs">
          <h6>Nombre Total de sacs</h6>
          
          </div>
        <div className="prix-total">
          <h6>Prix Total en dinars</h6>
        </div>
      
      <div className="action">
          <h6>ACTIONS</h6>
      </div>
    
    </div>
    
    
  </div>
    
    {/*{Object.keys(APIData).length > 0 &&*/}
    {/*        APIData.map((data) => {*/}
    {/*        return (*/}
    {/*            <ExportElment data={data} doChanging={doChanging}/>*/}
    {/*        )*/}
    {/*        }*/}
    {/*        )}*/}
      
      <LoadingIndicator isLoading={isLoading} />
      {selectedClient && groupedData[selectedClient].map((item) => (
          <ExportElment key={item.id} data={item} doChanging={doChanging}/>
      ))}
      <button onClick={handleLastPage} disabled={currentPage === 1}>
        Précédent
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === maxPage}>
        Suivant
      </button>
    </>
    
           
 
            
  



 


  )

}

export default ExportList