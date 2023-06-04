import JwtKeyContext from '../../context/JwtKeyContext';
import Modifier_client from './modifier_client';
import React,  {useContext, useState }  from "react";





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
  fetch("http://127.0.0.1:8089/api/client/"+props.data.id, {
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
      {!modal &&( <li className="table-row " key={userData.id}>
        <div className="col col-1">{userData.id}</div>
        <div className="col col-2">{userData.nom}</div>
        <div className=" col col-3">{userData.email}</div>
        <div className=" col col-4">{userData.adresse}</div>
        <div className=" col col-5">{userData.tel}</div>
        <div className=" col col-6"><div><button onClick={alertIt}>V</button ></div><div><button onClick={toggleModifierClientForm}>M</button></div><div><button onClick={supprimer}>S</button></div></div>
      </li>)}
     
      <Modifier_client modal={modal} toggleModifierClientForm={toggleModifierClientForm} userToUpdateData={userData} />
      </>
     
    )
    
}

export default ClientElment