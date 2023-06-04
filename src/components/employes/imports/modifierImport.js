import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./../styles/importList.css";
import JwtKeyContext from "../../context/JwtKeyContext";

function Modifier_import(props) {
    const modal=props.modal;
    const importData = props.data;

    const toggleModifierClientForm = () => {
        props.toggleModifierClientForm()
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/import/"+props.data.id, {
          method: "put",
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
            toggleModifierClientForm()
           }else{
            alert("error system")
           }
        })
    };
  
    
    const [data, setData] = useState({
            range_5: importData.range_5,
            range_10: importData.range_10,
            range_15: importData.range_15,
            range_20: importData.range_20,
            range_25: importData.range_25,
            range_30: importData.range_30,
            clientId: importData.client.id,
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
            clientId: Number(props.data.client.id)
        };


        console.log("**************");
        console.log(props.data)
        postData(userData);
    };

    return (
        <>
        
            {modal &&(
                <div className="modal_m">
                    
                                <form  onSubmit={handleSubmit}>
                                    <div className="form_modif">
                                        <div className="champ_2_d">-</div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_5" name="range_5" value={data.range_5} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_10" name="range_10" value={data.range_10} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_15"name="range_15" value={data.range_15} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_20"name="range_20" value={data.range_20} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_25"name="range_25" value={data.range_25} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ">
                                            <div className="champ_2">
                                            <input type="number" id="range_30"name="range_30" value={data.range_30} onChange={handleChange}/>
                                            </div>
                                            <div className="champ_2_m">-</div>
                                        </div>
                                        <div className="champ_2_t">-</div>
                                        <div className="champ_2_t">-</div>
                                        <button type="submit" name="valider_ajout">Valider</button>
                                        <button onClick={toggleModifierClientForm}>Annuler</button>
                                    </div>
                             </form>
                    
                
                </div>



            )}

            
        </>
    )
  
}

export default Modifier_import