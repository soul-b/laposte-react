import './../styles/exportList.css'
import ExportElment from './exportElement'
import React, { useContext, useEffect, useState } from 'react';
import Ajouter_export from '../../forms/ajouter_export';

import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';



function ExportList(props) {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCurrentDate,setPageCurrentDate] = useState('');

  const [maxPage, setMaxPage] = useState(0);

  const [changing, setChanging] = useState(1);


  const [groupedData ,setGroupedData ] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

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

//   useEffect(() => {
//     axios.get(`https://127.0.0.1:8088/api/export`)
//       .then((response) => {
//         setAPIData(response.data);
//       })
//   }, [props.isReload])


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = (page) => {
    console.log("https://127.0.0.1:8089/api/exports?page="+page)
   fetch("https://127.0.0.1:8089/api/exports?page="+page, {
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
        console.log('*********grouped data*******');
        console.log(groupedData);
        setPageCurrentDate(data.exports[0].date.substring(0, 7))
      });
  };

  useEffect(()=>{
    console.log("rerender")
    console.log(currentPage)
    console.log(groupedData);
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



<div className="table">
    <select value={selectedClient} onChange={(e) => handleClientChange(e.target.value)}>
      <option value="">Select a client</option>
      {clientList.map((clientId) => (
          <option key={clientId} value={clientId}>
            {getClientInfoById(clientId,APIData).nom}
          </option>
      ))}
    </select>
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
      {selectedClient && groupedData[selectedClient].map((item) => (
          <ExportElment key={item.id} data={item} doChanging={doChanging}/>
      ))}
      <button onClick={handleLastPage} disabled={currentPage === 1}>
        Précédent
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === maxPage}>>
        Suivant
      </button>
        
        <div className='ajout'><Ajouter_export doChanging={doChanging} /></div>
    </>
    
           
 
            
  



 


  )

}

export default ExportList