import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ClientSearch from './searchClient'

import "./ajouter_export.css";
import JwtKeyContext from "../context/JwtKeyContext";

function Ajouter_export(props) {
    const [modal, SetAjouter_export] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    
    const handleSelectClient = (clientId) => {
        setSelectedClientId(clientId);
      };
    
    const toggleAjouter_export = () => {
        SetAjouter_export(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/export/", {
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
        
           if(response.ok){
            alert("ajouter")
            props.doChanging()
            toggleAjouter_export()
           }else{
            alert("error system")
           }
        })
    };
  
    
    const [data, setData] = useState({
            range_5: "",
            range_10: "",
            range_15: "",
            range_20: "",
            range_25: "",
            range_30: "",
            clientId: "",
            date: "",
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
            range_5: Number(data.range_5),
            range_10: Number(data.range_10),
            range_15: Number(data.range_15),
            range_20: Number(data.range_20),
            range_25: Number(data.range_25),
            range_30: Number(data.range_30),
            clientId:Number(selectedClientId)
           
        };


        console.log("**************");
        console.log(JSON.stringify(userData))
        
        postData(userData);
    };

    return (
        <>
        
           
            {!modal &&(<button onClick={toggleAjouter_export} className="btn_ajouter_client">
                Ajouter
            </button>)}
            {modal &&(
                <div className="modal_ajout">
                    
                            <form  onSubmit={handleSubmit}>
                                <div className="form_ajout">
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 0 à 5kg:</label>
                                        <input className="input_a" type="number" id="range_5" name="range_5" value={data.range_5}onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 5 à 10kg:</label>
                                        <input className="input_a" type="number" id="range_10" name="range_10" value={data.range_10}onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 10 à 15kg:</label>
                                        
                                        <input className="input_a" type="number" id="range_15"name="range_15" value={data.range_15}onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 15 à 20kg:</label>
                                        <input className="input_a" type="number" id="range_20"name="range_20" value={data.range_20}onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 20 à 25kg:</label>
                                        <input type="number" id="range_25"name="range_25" value={data.range_25}onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    <div className="champ_a">
                                        <label className="lablel">Nombre de sac de 25 à 30kg:</label>
                                        <input className="input_a" type="number" id="range_30"name="range_30" value={data.range_30} onChange={handleChange}/>
                                        
                                        
                                    </div>
                                    
                                    <ClientSearch onSelectClient={handleSelectClient} />
                                    <button type="submit" name="valider_ajout">Valider</button>
                                    <button onClick={toggleAjouter_export}>Annuler</button>
                                </div>
                            </form>
    

                </div>

            )}

            
        </>
    )
  
}

export default Ajouter_export