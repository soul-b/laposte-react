import React, {useContext, useEffect, useState} from "react";
import ViewFactureTemplate from "./ViewFactureTemplate";
import JwtKeyContext from "../../context/JwtKeyContext";
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import LoadingIndicator from "../../utils/LoadingIndicator";

function ViewFacture({modal,hideView,factureId}){
    const [factureData,setFactureData]=useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);

    const [changing, setChanging] = useState(1);
    function doChanging() {
        setChanging(changing + 1);
    }

    const retryFetch = () => {
        doChanging();
        setError(null);
    }

    const jwtKey = useContext(JwtKeyContext);
    const fetchData = () => {
        fetch("http://127.0.0.1:8089/api/facture/"+factureId, {
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
                setFactureData(data);
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
    return(
        <>
            {modal &&
                <>
                    <div>
                    {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

                    {!isLoading && factureData && !error &&
                        <ViewFactureTemplate factureData={factureData}/>
                    }
                    {!error && <LoadingIndicator isLoading={isLoading}/>}
                </div>
                    <div>
                        <button onClick={hideView} style={{ position: 'relative', zIndex: '100' }}>
                            Hide
                        </button>
                    </div>
                </>

            }
        </>

    )
}

export default ViewFacture;
