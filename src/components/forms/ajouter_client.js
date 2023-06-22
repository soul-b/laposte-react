import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./ajouter_client.css";
import JwtKeyContext from "../context/JwtKeyContext";

function Ajouter_client({doChanging}) {
    const [modal, SetAjouter_client] = useState(false);
    
    const toggleAjouter_client = () => {
        SetAjouter_client(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/client/", {
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
               doChanging();
            toggleAjouter_client()
           }else{
            alert("error system")
           }
        });
    };
  
    
    const [data, setData] = useState({
        email: "",
        nom: "",
        adresse: "",
        tel:"",
        codepostal: "",
        matriculefiscale: "",
        ville: ""
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
            ville:data.ville,
            codepostal:data.codepostal,
            matriculefiscale:data.matriculefiscale
        };

        console.log("**************");
        console.log(userData)
        postData(userData);
    };

    return (
        <>
        
           
            {!modal &&(<button onClick={toggleAjouter_client} className="btn_ajouter_client">
                Ajouter
            </button>)}
            {modal &&(
                <div className="modal">
                <form className="form" onSubmit={handleSubmit}>
                                <div className="image">
                                    <span id="close_a" className="close" onClick={toggleAjouter_client}>&times;</span>
                                </div>
                                <div className="content">
                                    <label><strong>Nom : </strong></label>
                                    <input type="text" name="nom" className="textzone" placeholder="Entrer le nom" value={data.nom} onChange={handleChange}/>

                                    <label><strong>Mail : </strong></label>
                                    <input type="text" name="email" className="textzone" placeholder="Entrer le mail" value={data.email} onChange={handleChange}/>

                                    <label><strong>Adresse : </strong></label>
                                    <input type="text" name="adresse" className="textzone" placeholder="Entrer la adresse" value={data.adresse} onChange={handleChange}/>

                                    <label><strong>Téléphone : </strong></label>
                                    <input type="text" name="tel" className="textzone" placeholder="Entrer le numéro de télephone " value={data.tel} onChange={handleChange}/>

                                    <label><strong>Code postale : </strong></label>
                                    <input type="text" name="codepostal" className="textzone" placeholder="Entrer le code postal " value={data.codepostal} onChange={handleChange}/>

                                    <label><strong>Matricule fiscale : </strong></label>
                                    <input type="text" name="matriculefiscale" className="textzone" placeholder="Entrer le matricule fiscale " value={data.matriculefiscale} onChange={handleChange}/>

                                    <label><strong>Vile : </strong></label>
                                    <input type="text" name="ville" className="textzone" placeholder="Entrer le matricule fiscale " value={data.ville} onChange={handleChange}/>



                                    <button type="submit" name="valider_ajout">Valider</button>


                                </div>
                                
                                <div className="content">
                                    <button id="btnreset" className="btnreset" onClick={toggleAjouter_client}>Annuler</button>
                                </div>
                </form>
            </div>

            )}

            
        </>
    )
  
}

export default Ajouter_client