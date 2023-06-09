import JwtKeyContext from '../../context/JwtKeyContext';
import React,  {useContext, useState }  from "react";





function FactureElment(props) {
  

  
  const alertIt = () => {
    alert(props.data.id)
} 


const jwtKey = useContext(JwtKeyContext);
const supprimer = () => {
  fetch("http://127.0.0.1:8089/api/facture/"+props.data.id, {
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
const factureData =props.data;
console.log(factureData)
    return  (
      <> 
      <li className="table-row " >
        <div className="col col-1">1</div>
        <div className="col col-2">256987</div>
        <div className=" col col-3">12/06/2023</div>
        <div className=" col col-4">client1</div>
        <div className=" col col-6"><div><button onClick={alertIt}>V</button ></div><div><button onClick={supprimer}>S</button></div></div>
      </li>
     
     
      </>
     
    )
    
}

export default FactureElment