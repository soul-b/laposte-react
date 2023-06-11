import Employe from './employeElement.js'
import './../styles/listeemployes.css'
import React, {useContext, useEffect, useState} from "react";
import JwtKeyContext from "../../context/JwtKeyContext";
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import ClientElment from "../client/clientElement";
import LoadingIndicator from "../../utils/LoadingIndicator";
import EmployeElement from "./employeElement.js";


function Listeemployes(props) {
    const [APIData, setAPIData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [changing, setChanging] = useState(1);
    const [error, setError] = useState(null);

    function doChanging() {
        setChanging(changing + 1);
    }


    const retryFetch = () => {
        doChanging();
        setError(null);
    }

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
        <div className="container_l">
            <div>
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
                <ul className="responsive-table_e">
                    {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

                    {!isLoading && Object.keys(APIData).length > 0 && !error && APIData.map((data) => (
                            <EmployeElement data={data} doChanging={doChanging}/>
                        )
                    )}
                    {!error && <LoadingIndicator isLoading={isLoading}/>}
                </ul>
            </div>
            <div>
                <button className='ajout'>Ajouter</button>
            </div>


        </div>


    )
}

export default Listeemployes