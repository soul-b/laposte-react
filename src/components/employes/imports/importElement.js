import React,  {useContext, useState }  from "react";
import Modifier_import from "./modifierImport"
import "./../styles/importList.css"
import JwtKeyContext from "../../context/JwtKeyContext";




function ClientElment(props) {
  const [modal, SetModal] = useState(false);



  
  const alertIt = () => {
    alert(props.data.id)
} 
const toggleModifierClientForm = () => {
  SetModal(!modal)
}

const jwtKey = useContext(JwtKeyContext);
const supprimer = () => {
    fetch("https://127.0.0.1:8089/api/import/"+props.data.id, {
      method: "delete",
      headers: {
        'Authorization': `Bearer ${jwtKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
     
    })
    .then( (response) => { 
       //do something awesome that makes the world a better place
       console.log(response)
       if(response.ok){
           props.doChanging();
        alert("delete")
       }else{
        alert("error system")
       }
    });
  
  }

const importData =props.data;
console.log(importData)
    return  (
      <> 
      {!modal &&(
        <div className="form_modif" key={importData.id}>
        <div className="field_2_d">{importData.date.split("T")[0]}</div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_5}
          </div>
          <div className="field_2_m">{importData.range_5*5}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_10}
          </div>
          <div className="field_2_m">{importData.range_10*6}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_15}
          </div>
          <div className="field_2_m">{importData.range_15*7}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_20}
          </div>
          <div className="field_2_m">{importData.range_20*8}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_25}
          </div>
          <div className="field_2_m">{importData.range_25*9}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {importData.range_30}
          </div>
          <div className="field_2_m">{importData.range_30*10}</div>
        </div>
        <div className="field_2_t">{importData.range_5+importData.range_10+importData.range_15+importData.range_20+importData.range_25+importData.range_30}</div>
        <div className="field_2_t">{importData.range_5*5+importData.range_10*6+importData.range_15*7+importData.range_20*8+importData.range_25*9+importData.range_30*10}</div>
        <button onClick={toggleModifierClientForm}>Modifier</button>
        <button onClick={supprimer}>supprimer</button>
      </div>

      )}
                <Modifier_import modal={modal} toggleModifierClientForm={toggleModifierClientForm} data={importData} doChanging={props.doChanging}/>
      </>
     
    )
    
}

export default ClientElment