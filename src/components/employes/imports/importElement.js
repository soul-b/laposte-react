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
    fetch("http://127.0.0.1:8089/api/import/"+props.data.id, {
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

const userData =props.data;
console.log(userData)
    return  (
      <> 
      {!modal &&(
        <div className="form_modif" key={userData.id}>
        <div className="field_2_d">{userData.date}</div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_5}
          </div>
          <div className="field_2_m">{userData.range_5*5}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_10}
          </div>
          <div className="field_2_m">{userData.range_10*6}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_15}
          </div>
          <div className="field_2_m">{userData.range_15*7}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_20}
          </div>
          <div className="field_2_m">{userData.range_20*8}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_25}
          </div>
          <div className="field_2_m">{userData.range_25*9}</div>
        </div>
        <div className="field">
          <div className="field_2_s">
          {userData.range_30}
          </div>
          <div className="field_2_m">{userData.range_30*10}</div>
        </div>
        <div className="field_2_t">{userData.range_5+userData.range_10+userData.range_15+userData.range_20+userData.range_25+userData.range_30}</div>
        <div className="field_2_t">{userData.range_5*5+userData.range_10*6+userData.range_15*7+userData.range_20*8+userData.range_25*9+userData.range_30*10}</div>
        <button onClick={toggleModifierClientForm}>Modifier</button>
        <button onClick={supprimer}>supprimer</button>
      </div>

      )}
                <Modifier_import modal={modal} toggleModifierClientForm={toggleModifierClientForm} data={userData} doChanging={props.doChanging}/>
      </>
     
    )
    
}

export default ClientElment