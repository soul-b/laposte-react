import './../styles/importList.css'
import ImportElment from './importElement'
import React, {useEffect, useState, useContext} from 'react';
import Ajouter_import from '../../forms/ajouter_import';
import JwtKeyContext from '../../context/JwtKeyContext';
import ExportElment from "../exports/exportElement";
import LoadingIndicator from "../../utils/LoadingIndicator";
import ServerErrorComponent from "../../utils/ServerErrorComponent";


function ImportList(props) {
    const [APIData, setAPIData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCurrentDate, setPageCurrentDate] = useState('');
    const [maxPage, setMaxPage] = useState(0);

    const [changing, setChanging] = useState(1);

    const [groupedData, setGroupedData] = useState([]);
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
        fetch("https://127.0.0.1:8089/api/imports?page=" + page, {
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
            <div className="controle-panel">
                <button onClick={handleFirstPage} disabled={currentPage === 1} className="control-button first-button">
                    First
                </button>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="control-button previous-button">
                    Précédent
                </button>
                <select value={currentPage} onChange={handlePageSelect} className="page-select current-page">
                    {Array.from({ length: maxPage }, (_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
                <button onClick={handleNextPage} disabled={currentPage === maxPage} className="control-button next-button">
                    Suivant
                </button>
                <button onClick={handleLastPage} disabled={currentPage === maxPage} className="control-button last-button">
                    Last
                </button>
            </div>

            <div className="parametre">

                <select className='select_client' value={selectedClient}
                        onChange={(e) => handleClientChange(e.target.value)}>
                    <option value="">Select a client</option>
                    {clientList.map((clientId) => (
                        <option key={clientId} value={clientId}>
                            {getClientInfoById(clientId, APIData) &&
                                getClientInfoById(clientId, APIData).nom}
                        </option>
                    ))}
                </select>

                <div><Ajouter_import doChanging={doChanging}/></div>
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

            {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}
            {!isLoading && selectedClient && groupedData[selectedClient].map((item) => (
                <ImportElment key={item.id} data={item} doChanging={doChanging}/>
            ))}
            {!error && <LoadingIndicator isLoading={isLoading}/>}

            <div className="controle-importList">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="precedent-import">
                    Précédent
                </button>
                <span className="curent-page">{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === maxPage} className="next-import">
                    Suivant
                </button>
            </div>



        </>


    )

}

export default ImportList