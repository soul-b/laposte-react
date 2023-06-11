import './../styles/employe.css'
import {useContext} from "react";
import JwtKeyContext from "../../context/JwtKeyContext";

function EmployeElement({data,doChanging}) {
    const employeData = data;
    const jwtKey = useContext(JwtKeyContext);
    const supprimer = () => {
        fetch("http://127.0.0.1:8089/api/employe/" + employeData.id, {
            method: "delete",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


        })
            .then((response) => {
                //do something awesome that makes the world a better place
                console.log(response)
                if (response.ok) {
                    doChanging();
                } else {
                    alert("error system")
                }
            });

    }
    return  (


          <li className="table-header_e" key={employeData.id}>
            <div className="col_e col_e-1">{employeData.id}</div>
            <div className="col_e col_e-2">{employeData.nom}</div>
            <div className="col_e col_e-3">{employeData.prenom}</div>
            <div className="col_e col_e-4">{employeData.email}</div>
            <div className="col_e col_e-5">{employeData.tel}</div>
              <div className="col_e col_e-5">{employeData.roles.includes("ROLE_ADMIN")? "ADMIN" :""}</div>
              <div className="col_e col_e-6">
                  <div><button>V</button></div>
                  <div><button>M</button></div>
                  <div><button onClick={supprimer}>Supprimer</button></div></div>
          </li>


    )
    
}

export default EmployeElement