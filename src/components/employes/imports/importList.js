import './../styles/importList.css'
import ImportElment from './importElement'
import React, { useEffect, useState, useContext } from 'react';
import Ajouter_import from '../../forms/ajouter_import';
import JwtKeyContext from '../../context/JwtKeyContext';
import ExportElment from "../exports/exportElement";
import LoadingIndicator from "../../utils/LoadingIndicator";





function ImportList(props) {
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
    }
  }
  function handleLastPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }


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


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = (page) => {
    fetch("https://127.0.0.1:8089/api/imports?page=" + page, {
      headers: {
        'Authorization': `Bearer ${jwtKey}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setMaxPage(data.total_pages);
        setAPIData(data.imports.sort((a, b) => a.client.id - b.client.id));

        setGroupedData(data.imports.reduce((result, item) => {
          const clientId = item.client.id;
          if (!result[clientId]) {
            result[clientId] = [];
          }
          result[clientId].push(item);
          return result;
        }, {}));
        setClientList(Object.keys(groupedData));

        setSelectedClient(data.imports[0].client.id);

        setPageCurrentDate(data.imports[0].date.substring(0, 7));

        setIsLoading(false);

      });
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData(currentPage)
  }, [currentPage, changing])



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

        <div ><Ajouter_import doChanging={doChanging} /></div>
      </div>

      <div className="table">

        <div className="title">IMPORTS</div>
        <div className="sub-title">Poids des sacs</div>
        <div className="part">
          <div className="date_a">{pageCurrentDate}</div>
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
      {/*  APIData.map((data) => {*/}
      {/*    return (*/}
      {/*      <ImportElment data={data} doChanging={doChanging} />*/}
      {/*    )*/}
      {/*  }*/}
      {/*  )}*/}

      <LoadingIndicator isLoading={isLoading} />
      {selectedClient && groupedData[selectedClient].map((item) => (
          <ImportElment key={item.id} data={item} doChanging={doChanging}/>
      ))}
      <button onClick={handleLastPage} disabled={currentPage === 1}>
        Précédent
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === maxPage}>>
        Suivant
      </button>
    </>











  )

}

export default ImportList