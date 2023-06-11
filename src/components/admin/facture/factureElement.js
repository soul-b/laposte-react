import JwtKeyContext from '../../context/JwtKeyContext';
import React, {useContext, useEffect, useState} from "react";
import ViewFacture from "./ViewFacture";


function FactureElment({factureData, doChanging,}) {
    const [modal, setModal] = useState(false);



    const jwtKey = useContext(JwtKeyContext);
    const supprimer = () => {
        fetch("http://127.0.0.1:8089/api/facture/" + factureData.id, {
            method: "delete",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


        })
            .then((response) => {
                //do something awesome that makes the world a better place
                console.log(response)
                if (response.ok) {
                    alert("delete")
                } else {
                    alert("error system")
                }
            });

    }

    const toogleView = () => {
        setModal(!modal);
    }

    return (
        <>
            <li className="table-row ">
                <div className="col col-1">{factureData.id}</div>
                <div className="col col-2">{factureData.numerofacture}</div>
                <div className=" col col-3">{factureData.date.split("T")[0]}</div>
                <div className=" col col-4">{factureData.client.nom}</div>
                <div className=" col col-6">
                    <div>
                        <button onClick={toogleView}>Voir</button>
                    </div>
                    <div>
                        <button onClick={supprimer}>Supprimer</button>
                    </div>
                </div>
            </li>
            {
                modal && <ViewFacture factureId={factureData.id} hideView={toogleView} modal={modal}/>
            }
        </>

    )

}

export default FactureElment