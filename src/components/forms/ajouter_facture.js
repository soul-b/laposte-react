import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./ajouter_facture.css";
import JwtKeyContext from "../context/JwtKeyContext";

function Ajouter_facture(props) {
    const [modal, SetAjouter_facture] = useState(false);
    
    const toggleAjouter_facture = () => {
        SetAjouter_facture(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/facture/", {
          method: "post",
          headers: {
            'Authorization': `Bearer ${jwtKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        
          //make sure to serialize your JSON body
          body: JSON.stringify(dataToSubmit)
        })
        .then( (response) => { 
           //do something awesome that makes the world a better place
           console.log(response)
           if(response.ok){
            toggleAjouter_facture()
           }else{
            alert("error system")
           }
        });
    };
  
    
    const [data, setData] = useState({
        email: "",
        nom: "",
        adresse: "",
        tel:""
      });

      const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            nom: data.nom,
            tel: Number(data.tel),
            email: data.email,
            adresse: data.adresse,
        };

        const userData2 = {
            nom: "Facture test submit",
            tel: 6666666,
            email: "66d66@example.com",
            adresse: "Adresse facture 666",
          }
        console.log("**************");
        console.log(userData)
        postData(userData);
    };

    return (
      
        <div>

            <button onClick={toggleAjouter_facture} className="btn_ajouter_facture">
                Ajouter
            </button>
            {modal &&(
                <div class="v_all">

                        <div class="all">

                                
                            <header>
                                <h2>Facture N -</h2>
                            </header>

                            <div class="description">
                                <div class="adresse">
                                    <h3>Nom: </h3>
                                    <h3>Matricule fiscale: </h3>
                                    <h3>Adresse: </h3>
                                    <h3>Code postale: </h3>
                                    <h3>Ville: </h3>
                                    <h3>Téléphone: </h3>
                                </div>

                                <div class="date">
                                    <h3>Date: </h3>
                                    <h3>Mois: </h3>
                                    <h3>Réf: </h3>
                                </div>
                            </div>

                            <div class="facture">
                                <div class="tab">
                                    <div>
                                        <table border="2" class="tab_1">
                                            <tr>
                                                <th rowspan="3">Montant Total</th>
                                                <th rowspan="3">Prix Unitaire</th>
                                                <th rowspan="3">Quantité</th>
                                                <th rowspan="3">Désignation Produit/prestation Collecte</th>
                                                <th rowspan="3">Code Produit/prestation</th>
                                            </tr>

                                            <tr></tr><tr></tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td colspan="4">Montant Global</td>
                                                
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td colspan="4">Remise</td>
                                                
                                            </tr>

                                            <tr>
                                                <td>-</td>
                                                <td colspan="4">Montant Global Net à Payer</td>
                                                
                                            </tr>

                                        </table>
                                    </div>
                                    
                                    <div class="tab_2_3">
                                        <table border="2" class="tab_2">
                                            <tr>
                                                <th rowspan="2">Colis Arrivée</th>
                                                <th>Nombre de Colis</th>
                                                <th>Montant</th>
                                            </tr>

                                            <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            </tr>
                                        </table>

                                        <table border="2" class="tab_3">
                                            <tr>
                                                <th rowspan="2">Colis Départ</th>
                                                <th>Nombre de Colis</th>
                                                <th>Montant</th>
                                            </tr>

                                            <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            </tr>
                                        </table>
                                    </div>
                                

                                </div>
                            </div>

                            <div class="resume">
                                    <div class="payement">
                                        <h3>Au Comptant </h3>
                                        <h3>Par chèque </h3>
                                        <h3>Par Virement </h3>
                                        <h3>Veuillez virez </h3>
                                        <h3>Au CCP n: 17001000000034388531 </h3>
                                        <h3>Le Montant: - </h3>
                                    </div>

                                    <div class="signature">
                                        <h3>Signature et Cachet</h3>
                                    </div>
                            </div>

                            <footer>
                                <p class="p_1">
                                    <strong>La Poste Tunisienne,</strong>
                                    Rue Hédie Nouira 1030 - Tunis - Tel : 71 839000  <span >-Fax: 71831174</span> 
                                    Registre de commerce B1123081998  <span >Matricule fiscale 513287HPM000</span>
                                </p>

                                <p class="p_2">
                                    <h4>La Poste Tunisienne, un souci constant pour mieux vous servir</h4>
                                </p>
                            </footer>

                        </div>

                        <button class="btn">Publier</button>

                </div>

            )}


        </div>
           
           

            
        
    )
  
}

export default Ajouter_facture