import './../styles/exportList.css'
import ExportElment from './exportElement'
import React, { useContext, useEffect, useState } from 'react';
import Ajouter_export from '../../forms/ajouter_export';

import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';
import LoadingIndicator from "../../utils/LoadingIndicator";
import Ajouter_import from "../../forms/ajouter_import";

import Swal from 'sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css';
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import ImportElment from "../imports/importElement";

function ExportList(props) {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCurrentDate,setPageCurrentDate] = useState('');

  const [maxPage, setMaxPage] = useState(0);

  const [changing, setChanging] = useState(1);

  const Swal = require('sweetalert2')


  const [groupedData ,setGroupedData ] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  function doChanging() {
      setChanging(changing + 1);
  }

  function handleNextPage() {
      if (currentPage < maxPage) {
          setCurrentPage(currentPage + 1);
      }
  }

  function handleLastPage(){
      if (currentPage < maxPage) {
          setCurrentPage(maxPage);
      }
  }

  function handlePreviousPage() {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  }


  function handleFirstPage(){
      if (currentPage > 1) {
          setCurrentPage(1);
      }
  }

  const handlePageSelect = (event) => {
      const selectedPage = parseInt(event.target.value);
      setCurrentPage(selectedPage);
  };





  useEffect(() => {
      setClientList(Object.keys(groupedData));
  }, [groupedData])

  const handleClientChange = (clientId) => {
      setSelectedClient(clientId);
  };

  const getClientInfoById = (clientId, data) => {
      // Retrieve client info by ID
      const clientInfo = data.find(item => item.client.id == clientId);
      console.log("***********")
      console.log(clientInfo)
      return clientInfo ? clientInfo.client : null;
  };


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = (page) => {
      fetch("http://127.0.0.1:8089/api/exports?page=" + page, {
          headers: {
              'Authorization': `Bearer ${jwtKey}`,
              'Content-Type': 'application/json'
          }
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Server not responding');
              }
              return response.json();
          })
          .then((data) => {
              setMaxPage(data.total_pages);
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

          }).catch((error) => {
          setError('Les donnes ne peut pas etre recuperé, ressayer plus tard');
          console.error('NetworkError:', error);
      });
      ;
  };

  useEffect(() => {
      setIsLoading(true);

      fetchData(currentPage)
  }, [currentPage, changing])

  const retryFetch = () => {
      doChanging();
      setError(null);
  }

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
      <div className="date_b">{pageCurrentDate}</div>
      <div className="sub-part">
        <div className="range">
          <h6>0 à 5 kg</h6>
          <div className="sub-range"> 
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
        
            
          </div>
        <div className="range">
          <h6>5 à 10 kg</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>10 à 15 kg</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>15 à 20 kg</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>20 à 25 kg</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>25 à 30 kg</h6>
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

        {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}
        {!isLoading && selectedClient && groupedData[selectedClient].map((item) => (
            <ExportElment key={item.id} data={item} doChanging={doChanging}/>
        ))}
        {!error && <LoadingIndicator isLoading={isLoading}/>}
       <div className="controle-panel">
                
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" onClick={handleFirstPage} disabled={currentPage === 1} className="control-button first-button" ><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/></svg>
                
                
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" onClick={handlePreviousPage} disabled={currentPage === 1} className="control-button previous-button"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                
                <select value={currentPage} onChange={handlePageSelect} className="page-select current-page">
                    {Array.from({ length: maxPage }, (_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
                
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" onClick={handleNextPage} disabled={currentPage === maxPage} className="control-button next-button"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                
                
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" onClick={handleLastPage} disabled={currentPage === maxPage} className="control-button last-button" ><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
                
            </div>
    </>
    
           
 
            
  



 


  )

}

export default ExportList