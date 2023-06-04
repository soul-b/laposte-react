import React,  {useContext, useState }  from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import JwtKeyContext from "../../context/JwtKeyContext";


function Modifier_client(props) {
    const modal=props.modal;
    
    const toggleModifierClientForm = () => {
        props.toggleModifierClientForm()
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/client/"+props.userToUpdateData.id, {
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
           console.log(response)
           if(response.ok){
            alert("modify")
           }else{
            alert("error system")
           }
        });
    };
  
    
    const [data, setData] = useState({
        email: props.userToUpdateData.email,
        nom: props.userToUpdateData.nom,
        adresse: props.userToUpdateData.adresse,
        tel:props.userToUpdateData.tel
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
            nom: "Client test submit",
            tel: 6666666,
            email: "66d66@example.com",
            adresse: "Adresse client 666",
          }
        console.log("**************");
        console.log(userData)
        postData(userData);
    };

    return (
        <>
            {modal &&(
                
                <form className="table-row" onSubmit={handleSubmit}>
                                
                                    <input type="text" name="nom" className="col col-1" placeholder="Entrer le nom" value={props.userToUpdateData.id} onChange={handleChange}/>

                                    
                                    <input type="text" name="nom" className="col col-2" placeholder="Entrer le nom" value={data.nom} onChange={handleChange}/>

                                   
                                    <input type="text" name="email" className="col col-3" placeholder="Entrer le mail" value={data.email} onChange={handleChange}/>

                                    
                                    <input type="text" name="adresse" className="col col-4" placeholder="Entrer la adresse" value={data.adresse} onChange={handleChange}/>

                                    
                                    <input type="text" name="tel" className="col col-5" placeholder="Entrer le numéro de télephone " value={data.tel} onChange={handleChange}/>
                                    <div className=" col col-6"><div><button type="submit" name="valider_ajout">Valider</button></div><div><button id="" className="" onClick={toggleModifierClientForm}>Annuler</button></div></div>

                                    
                              
                                
                                
                </form>
            

            )}

            
        </>
    )
  
}

export default Modifier_client