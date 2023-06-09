import React,  {useContext, useState }  from "react";
import Modifier_export from "./modifierExport"
import "./../styles/exportList.css"
import JwtKeyContext from "../../context/JwtKeyContext";




function ExportElment(props) {
  const [modal, SetModal] = useState(false);



  
  const alertIt = () => {
    alert(props.data.id)
} 
const toggleModifierClientForm = () => {
  SetModal(!modal)
}

const jwtKey = useContext(JwtKeyContext);
const supprimer = () => {
    fetch("http://127.0.0.1:8089/api/export/"+props.data.id, {
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
        alert("delete")
       }else{
        alert("error system")
       }
    });
  
  }

const exportData =props.data;
console.log(exportData)
    return  (
      <> 
      {!modal &&(
        <div className="form_modif" key={exportData.id}>
        <div className="field_2_d">{exportData.date.split("T")[0]}</div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_5}
          </div>
          <div className="field_2_m">{exportData.range_5*5}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_10}
          </div>
          <div className="field_2_m">{exportData.range_10*6}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_15}
          </div>
          <div className="field_2_m">{exportData.range_15*7}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_20}
          </div>
          <div className="field_2_m">{exportData.range_20*8}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_25}
          </div>
          <div className="field_2_m">{exportData.range_25*9}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {exportData.range_30}
          </div>
          <div className="field_2_m">{exportData.range_30*10}</div>
        </div>
        <div className="field_2_t">{exportData.range_5+exportData.range_10+exportData.range_15+exportData.range_20+exportData.range_25+exportData.range_30}</div>
        <div className="field_2_t">{exportData.range_5*5+exportData.range_10*6+exportData.range_15*7+exportData.range_20*8+exportData.range_25*9+exportData.range_30*10}</div>
        <button onClick={toggleModifierClientForm}>Modifier</button>
        <button onClick={supprimer}>supprimer</button>
      </div>

      )}
                <Modifier_export modal={modal} toggleModifierClientForm={toggleModifierClientForm} data={exportData} doChanging={props.doChanging}/>
      </>
     
    )
    
}

export default ExportElment