import JwtKeyContext from '../../context/JwtKeyContext';
import Modifier_client from './modifier_client';
import React, {useContext, useState} from "react";

function ClientElment({data,doChanging}) {
    const [modal, SetModal] = useState(false);


    const alertIt = () => {
        supprimer()
    }
    const toggleModifierClientForm = () => {
        SetModal(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const supprimer = () => {
        fetch("http://127.0.0.1:8089/api/client/" + data.id, {
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
    const userData = data;
    const voir=()=>{
        console.log(userData.imports);
    }
    console.log(userData)
    return (
        <>
            {!modal && (<li className="table-row " key={userData.id}>
                <div className="col col-1">{userData.id}</div>
                <div className="col col-2">{userData.nom}</div>
                <div className=" col col-3">{userData.email}</div>
                <div className=" col col-4">{userData.adresse}</div>
                <div className=" col col-5">{userData.tel}</div>

                <div className=" col col-6">
                    <div>
                        <button onClick={supprimer}>S</button>
                    </div>
                    <div>
                        <button onClick={toggleModifierClientForm}>M</button>
                    </div>
                    <div>
                        <button onClick={voir}>V</button>
                    </div>
                </div>

            </li>)}

            <Modifier_client modal={modal} toggleModifierClientForm={toggleModifierClientForm}
                             userToUpdateData={userData} doChanging={doChanging}/>
        </>

    )
}

export default ClientElment