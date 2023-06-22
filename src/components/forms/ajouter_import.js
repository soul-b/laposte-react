import React,  {useContext, useState }  from "react";
import ClientSearch from './searchClient'

import "./ajouter_import.css";
import JwtKeyContext from "../context/JwtKeyContext";

import Swal from 'sweetalert2'

function Ajouter_import(props) {
    const [modal, SetAjouter_import] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    const Swal = require('sweetalert2')


    const handleSelectClient = (clientId) => {
        setSelectedClientId(clientId);
      };

    const toggleAjouter_import = () => {
        SetAjouter_import(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        fetch("http://127.0.0.1:8089/api/import/", {
          method: "post",
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
            Swal.fire({
                icon: 'success',
                title: 'Client ajouté !',
                showConfirmButton: false,
                timer: 1500
              })
            props.doChanging()
            toggleAjouter_import()
           }else{
            Swal.fire({
                icon: 'error',
                title: 'veillez remplir tous les champs !',
                showConfirmButton: false,
                timer: 1500
              })
           }
        })
    };


    const [data, setData] = useState({
            range_5: "",
            range_10: "",
            range_15: "",
            range_20: "",
            range_25: "",
            range_30: "",
            clientId: "",
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
            clientId:Number(selectedClientId),
            date: data.date ? data.date : new Date().toISOString().split('T')[0]
        };


        console.log("**************");
        console.log(JSON.stringify(userData))

        postData(userData);
    };

    return (
        <>


            {!modal &&(<button onClick={toggleAjouter_import} className="btn_ajouter_import">
                Ajouter un nouvel import
            </button>)}
            {modal &&(
                <div className="modal_ajout">

                            
<form  onSubmit={handleSubmit}>
<div className="form_ajout_t">
                    <div className="title_facture">Créer un import</div>
                    <div className="subtitle">Veillez saisir les informations nécessaires</div>
                    <div className="input-container ic1">
                      <ClientSearch  onSelectClient={handleSelectClient} />
                      <div className="cut"></div>
                      <label for="clientname" className="placeholder">Nom du client</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number" name="range_5" placeholder=" " value={data.range_5}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 0 à 5 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number"  name="range_10" placeholder=" " value={data.range_10}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 5 à 10 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number"  name="range_15" placeholder=" " value={data.range_15}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 10 à 15 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number"  name="range_20" placeholder=" " value={data.range_20}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 15 à 20 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number"  name="range_25" placeholder=" " value={data.range_25}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 20 à 25 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input className="input_nb_sacs" type="number" name="range_30"  placeholder=" " value={data.range_30}onChange={handleChange}/>
                      <div className="cut"></div>
                      <label for="type" className="placeholder">Nombre de sacs de 25 à 30 kg</label>
                    </div>
                    <div className="input-container ic2">
                      <input id="date_transaction" className="input_nb_sacs" name="date" type="date" placeholder=" " />
                      <div className="cut"></div>
                      <label for="date_transaction" className="placeholder">Période de transaction (mm/aaaa)</label>
                    </div>
                    
                    
                   <div className="btns">
                     <button type="text" className="annuler" onClick={toggleAjouter_import}>Annuler</button>
                     <button type="submit" className="submit">Valider</button>
                     
                   </div>
                    
                  </div>
</form>


                </div>

            )}


        </>
    )

}

export default Ajouter_import