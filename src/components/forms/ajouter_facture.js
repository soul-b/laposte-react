import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./ajouter_facture.css";
import JwtKeyContext from "../context/JwtKeyContext";
import Publier_facture from "./publier_facture";

function Ajouter_facture(props) {
    const [modal, SetAjouter_facture] = useState(false);
    const [publier, SetPublier_facture] = useState(false);
    
    const toggleAjouter_facture = () => {
        
        return new Promise((resolve) => {
            // Logique de la première fonction
            SetAjouter_facture(!modal)
            resolve();
          });
    }

    const togglePublier_facture = () => {
        
        return new Promise((resolve) => {
            // Logique de la première fonction
            SetPublier_facture(!publier)
            resolve();
          });
    }

    async function toggleAffichePublier_facture() {
       await toggleAjouter_facture()
       await togglePublier_facture()
        
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
      
        <div className="facture">

            <button onClick={toggleAjouter_facture} className="btn_ajouter_facture">
                Ajouter une facture
            </button>
            {modal &&(
                    <div class="form_facture">
                    <div class="title_facture">Générer une facture</div>
                    <div class="subtitle">Veillez saisir les informations nécessaires</div>
                    <div class="input-container ic1">
                      <input id="clientname" class="input_facture" type="text" placeholder=" " />
                      <div class="cut"></div>
                      <label for="clientname" class="placeholder">Nom du client</label>
                    </div>
                    <div class="input-container ic2">
                      <input id="type" class="input_facture" type="text" placeholder=" " />
                      <div class="cut"></div>
                      <label for="type" class="placeholder">Type de transaction</label>
                    </div>
                    <div class="input-container ic2">
                      <input id="date_transaction" class="input_facture" type="text" placeholder=" " />
                      <div class="cut"></div>
                      <label for="date_transaction" class="placeholder">Période de transaction (mm/aaaa)</label>
                    </div>
                    
                    
                   <div class="btns">
                     <button type="text" class="annuler" onClick={toggleAjouter_facture}>Annuler</button>
                     <button type="text" class="submit" onClick={togglePublier_facture}>Suivant</button>
                     
                   </div>
                    
                  </div>

            )}
            
            {publier &&(<Publier_facture/>)}


        </div>
           
           

            
        
    )
  
}

export default Ajouter_facture