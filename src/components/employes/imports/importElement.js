import React,  {useContext, useState }  from "react";
import Modifier_import from "./modifierImport"
import "./../styles/importList.css"
import JwtKeyContext from "../../context/JwtKeyContext";

import Swal from 'sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css';


function ClientElment(props) {
  const [modal, SetModal] = useState(false);

  const Swal = require('sweetalert2')

  
  const alertIt = () => {
    alert(props.data.id)
} 
const toggleModifierClientForm = () => {
  SetModal(!modal)
}

const jwtKey = useContext(JwtKeyContext);





const confirmation = () => {
  
  
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
           props.doChanging();
           swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
       }else{
        Swal.fire({
          icon: 'error',
          title: 'veillez remplir tous les champs !',
          showConfirmButton: false,
          timer: 1500
        })
       }
    });
  
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      supprimer();
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      
    }
  })
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

        <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 512 512" onClick={toggleModifierClientForm}><style></style><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
        <svg className="logo-svg-s" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 448 512" onClick={confirmation}><style></style><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        
      </div>

      )}
                <Modifier_import modal={modal} toggleModifierClientForm={toggleModifierClientForm} data={importData} doChanging={props.doChanging}/>
      </>
     
    )
    
}

export default ClientElment