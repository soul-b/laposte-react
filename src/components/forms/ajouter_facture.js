import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./ajouter_facture.css";
import JwtKeyContext from "../context/JwtKeyContext";
import Publier_facture from "./publier_facture";
import ClientSearch from "./searchClient";

function Ajouter_facture(props) {
    const [modal, SetAjouter_facture] = useState(false);
    const [publier, SetPublier_facture] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);


    const handleSelectClient = (clientId) => {
        setSelectedClientId(clientId);
    };

    const toggleAjouter_facture = () => {
        
        return new Promise((resolve) => {
            // Logique de la première fonction
            SetAjouter_facture(!modal)
            resolve();
          });
    }


    const jwtKey = useContext(JwtKeyContext);


    const fetchFactureData = (clientId , period) => {
        fetch(`http://127.0.0.1:8089/api/facture/${clientId}/imports-and-exports/${period}`, {
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
                SetPublier_facture(!publier);
            }).catch((error) => {
            setError('Les donnes ne peut pas etre recuperé, ressayer plus tard');
            console.error('NetworkError:', error);
        });
    };

    const togglePublier_facture = () => {

        fetchFactureData(selectedClientId,clientInfo.periode.split("-").slice(0, 2).join("-"));
        
        // return new Promise((resolve) => {
        //     // Logique de la première fonction
        //     SetPublier_facture(!publier)
        //     resolve();
        //   });
    }

    async function toggleAffichePublier_facture() {
       await toggleAjouter_facture()
       await togglePublier_facture()
        
    }

    const [clientInfo, setClientInfo] = useState({
        clientId: "",
        periode: ""
      });

    const [factureData, setFactureData] = useState({
        impQteRange5: 197,
        impPrixRange5: 1576,
        impUnitpriceRange5: 8,
        impQteRange10: 243,
        impPrixRange10: 3645,
        impUnitpriceRange10: 15,
        impQteRange15: 263,
        impPrixRange15: 6575,
        impUnitpriceRange15: 25,
        impQteRange20: 184,
        impPrixRange20: 5520,
        impUnitpriceRange20: 30,
        impQteRange25: 215,
        impPrixRange25: 8170,
        impUnitpriceRange25: 38,
        impQteRange30: 283,
        impPrixRange30: 12735,
        impUnitpriceRange30: 45,
        expQteRange5: 130,
        expPrixRange5: 1040,
        expUnitpriceRange5: 8,
        expQteRange10: 149,
        expPrixRange10: 2235,
        expUnitpriceRange10: 15,
        expQteRange15: 75,
        expPrixRange15: 1875,
        expUnitpriceRange15: 25,
        expQteRange20: 17,
        expPrixRange20: 510,
        expUnitpriceRange20: 30,
        expQteRange25: 68,
        expPrixRange25: 2584,
        expUnitpriceRange25: 38,
        expQteRange30: 92,
        expPrixRange30: 4140,
        expUnitpriceRange30: 45
    });
      const handleChange = (e) => {
        const value = e.target.value;
          setClientInfo({
          ...clientInfo,
          [e.target.name]: value
        });
      };
    
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const userData = {
    //         nom: data.nom,
    //         tel: Number(data.tel),
    //         email: data.email,
    //         adresse: data.adresse,
    //     };
    //
    //     const userData2 = {
    //         nom: "Facture test submit",
    //         tel: 6666666,
    //         email: "66d66@example.com",
    //         adresse: "Adresse facture 666",
    //       }
    //     console.log("**************");
    //     console.log(userData)
    //     postData(userData);
    // };

    return (
      
        <div className="facture">

            <button onClick={toggleAjouter_facture} className="btn_ajouter_facture">
                Ajouter une facture
            </button>
            {modal &&(
                    <div className="form_facture">
                    <div className="title_facture">Générer une facture</div>
                    <div className="subtitle">Veillez saisir les informations nécessaires</div>
                    <div className="input-container ic1">
                      {/*<input id="clientname" className="input_facture" type="text" placeholder=" " name="clientId"*/}
                      {/*value={clientInfo.clientId} onChange={handleChange}/>*/}
                        <ClientSearch onSelectClient={handleSelectClient} />
                        <div className="cut"></div>
                      {/*<label for="clientname" className="placeholder">Nom du client</label>*/}
                    </div>
                    <div className="input-container ic2">
                      <input id="date_transaction" className="input_facture" type="date" placeholder=" " name="periode"
                             value={clientInfo.periode} onChange={handleChange} />
                      <div className="cut"></div>
                      <label for="date_transaction" className="placeholder">Période de transaction (mm/aaaa) just choose a day at random</label>
                    </div>
                    
                    
                   <div className="btns">
                     <button type="text" className="annuler" onClick={toggleAjouter_facture}>Annuler</button>
                     <button type="text" className="submit" onClick={togglePublier_facture}>Suivant</button>
                     
                   </div>
                    
                  </div>

            )}
            
            {publier &&(<Publier_facture factureData={factureData}/>)}


        </div>
           
           

            
        
    )
  
}

export default Ajouter_facture