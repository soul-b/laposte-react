import React, {useContext, useEffect, useState} from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./publier_facture.css";
import JwtKeyContext from "../context/JwtKeyContext";
import writtenNumber from 'written-number';
import CreateFactureTemplate from "../admin/facture/CreateFactureTemplate";
import JsPDF from 'jspdf';

function Publier_facture({factureData}) {
    const [modal, SetPublier_facture] = useState(true);
    const generatePDF = () => {
        const report = new JsPDF('portrait','pt','a3');
        report.html(document.querySelector('#facture')).then(() => {
            report.save('report.pdf');
        });
    }
    const togglePublier_facture = () => {
        SetPublier_facture(!modal)
    }

    const jwtKey = useContext(JwtKeyContext);
    const postData = (dataToSubmit) => {
        console.log(JSON.stringify(dataToSubmit))
        fetch("http://127.0.0.1:8089/api/facture/", {
            method: "post",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(dataToSubmit)
        })
            .then((response) => {
                //do something awesome that makes the world a better place
                console.log(response)
                if (response.ok) {
                    generatePDF();
                    togglePublier_facture()
                } else {
                    alert("error system")
                }
            });
    };

    const [remise, setRemise] = useState(0);

    const [factureDataToSubmit, setFactureDataToSubmit] = useState({
        prixGlobal: factureData.totalPrixImport + factureData.totalPrixExport,
        remise: remise,
        prixGlobalNet: (factureData.totalPrixImport + factureData.totalPrixExport) + (factureData.totalPrixImport + factureData.totalPrixExport) * remise,
        ...factureData
    })

    const handlePublierFacture = (e) => {
        e.preventDefault();
        console.log("*************************");
        console.log(factureDataToSubmit);
        postData(factureDataToSubmit);
    };

    const handleRemiseChange = (event) => {
        const newRemise = parseFloat(event.target.value) / 100; // Assuming the input value is a number

        console.log(newRemise);

        setFactureDataToSubmit((prevFactureData) => ({
            ...prevFactureData,
            remise: newRemise,
            prixGlobalNet: (prevFactureData.prixGlobal) * (1 + newRemise),
        }));


    };


    useEffect(() => {
        console.log(factureDataToSubmit.prixGlobal);
    }, [remise]);

    return (

        <div>


            {modal && (

                // <div>
                //     <div className="overlay"></div>
                //     <div class="v_all">
                //
                //         <div class="all">
                //
                //
                //             <header>
                //                 <h2>Facture N-{factureData.numerofacture}</h2>
                //             </header>
                //
                //             <div class="description">
                //                 <div class="adresse">
                //                     <h3>Nom: </h3>
                //                     <h3>Matricule fiscale: </h3>
                //                     <h3>Adresse: </h3>
                //                     <h3>Code postale: </h3>
                //                     <h3>Ville: </h3>
                //                     <h3>Téléphone: </h3>
                //                 </div>
                //
                //                 <div class="date">
                //                     <h3>Date: </h3>
                //                     <h3>Mois: </h3>
                //                     <h3>Réf: </h3>
                //                 </div>
                //             </div>
                //
                //             <div class="facture">
                //                 <div class="tab">
                //                     <div>
                //                         <table border="2" class="tab_1">
                //                             <tr>
                //                                 <th rowspan="3">Montant Total</th>
                //                                 <th rowspan="3">Prix Unitaire</th>
                //                                 <th rowspan="3">Quantité</th>
                //                                 <th rowspan="3">Désignation Produit/prestation Collecte</th>
                //                                 <th rowspan="3">Code Produit/prestation</th>
                //                             </tr>
                //
                //                             <tr>
                //
                //                             </tr>
                //                             <tr></tr>
                //
                //                             <tr>
                //                                 <td>-</td>
                //                                 <td>-</td>
                //                                 <td>-</td>
                //                                 <td>-</td>
                //                                 <td>-</td>
                //                             </tr>
                //
                //                             {Object.entries(factureData).map(([key, value]) => {
                //                                 if (key.startsWith("impQte") && value !== 0) {
                //                                     const range = key.replace("impQteRange", "");
                //                                     const impPrixRangeX = factureData[`impPrixRange${range}`];
                //                                     const impUnitpriceRangeX = factureData[`impUnitpriceRange${range}`];
                //                                     const impQteRangeX = factureData[`impQteRange${range}`];
                //
                //                                     const randomInt = Math.floor(Math.random() * 100); // Example random value
                //
                //                                     return (
                //                                         <tr key={key} className="import_range_x">
                //                                             <td>{impPrixRangeX}</td>
                //                                             <td>{impUnitpriceRangeX}</td>
                //                                             <td>{impQteRangeX}</td>
                //                                             <td>de {parseInt(range) - 5} a {range} depart</td>
                //                                             <td>{randomInt}</td>
                //                                         </tr>
                //                                     );
                //                                 }
                //
                //                                 return null; // Skip rendering if Qte is 0
                //                             })}
                //
                //                             {/* Export ranges */}
                //                             {Object.entries(factureData).map(([key, value]) => {
                //                                 if (key.startsWith("expQte") && value !== 0) {
                //                                     const range = key.replace("expQteRange", "");
                //                                     const expPrixRangeX = factureData[`expPrixRange${range}`];
                //                                     const expQteRangeX = factureData[`expQteRange${range}`];
                //
                //                                     const expUnitpriceRangeX = factureData[`expUnitpriceRange${range}`];
                //                                     const randomInt = Math.floor(Math.random() * 100); // Example random value
                //
                //                                     return (
                //                                         <tr key={key} className="export_range_x">
                //                                             <td>{expPrixRangeX}</td>
                //                                             <td>{expUnitpriceRangeX}</td>
                //                                             <td>{expQteRangeX}</td>
                //                                             <td>de {parseInt(range) - 5} a {range} arrive</td>
                //                                             <td>{randomInt}</td>
                //                                         </tr>
                //                                     );
                //                                 }
                //
                //                                 return null; // Skip rendering if Qte is 0
                //                             })}
                //
                //                             <tr>
                //                                 <td>{factureDataToSubmit.prixGlobal}</td>
                //                                 <td colspan="4">Montant Global</td>
                //
                //                             </tr>
                //
                //                             <tr>
                //                                 <td>{factureDataToSubmit.remise * 100}%
                //                                     <input
                //                                         type="number"
                //                                         value={factureDataToSubmit.remise * 100}
                //                                         onChange={handleRemiseChange}
                //                                     />
                //                                 </td>
                //                                 <td colspan="4">Remise</td>
                //
                //                             </tr>
                //
                //                             <tr>
                //                                 <td>{factureDataToSubmit.prixGlobalNet}</td>
                //                                 <td colspan="4">Montant Global Net à Payer</td>
                //
                //                             </tr>
                //
                //                         </table>
                //                     </div>
                //
                //                     <div class="tab_2_3">
                //                         <table border="2" class="tab_2">
                //                             <tr>
                //                                 <th rowspan="2">Colis Arrivée</th>
                //                                 <th>Nombre de Colis</th>
                //                                 <th>Montant</th>
                //                             </tr>
                //
                //                             <tr>
                //                                 <td>{factureData.totalQteImport}</td>
                //                                 <td>{factureData.totalPrixImport}</td>
                //                             </tr>
                //                         </table>
                //
                //                         <table border="2" class="tab_3">
                //                             <tr>
                //                                 <th rowspan="2">Colis Départ</th>
                //                                 <th>Nombre de Colis</th>
                //                                 <th>Montant</th>
                //                             </tr>
                //
                //                             <tr>
                //                                 <td>{factureData.totalQteExport}</td>
                //                                 <td>{factureData.totalPrixExport}</td>
                //                             </tr>
                //                         </table>
                //                     </div>
                //
                //
                //                 </div>
                //             </div>
                //
                //             <div class="resume">
                //                 <div class="payement">
                //                     <h3>Au Comptant </h3>
                //                     <h3>Par chèque </h3>
                //                     <h3>Par Virement </h3>
                //                     <h3>Veuillez virez </h3>
                //                     <h3>Au CCP n: 17001000000034388531 </h3>
                //                     <h3>Le
                //                         Montant: {writtenNumber(factureData.totalPrixImport + factureData.totalPrixExport, {lang: 'fr'})} </h3>
                //                 </div>
                //
                //                 <div class="signature">
                //                     <h3>Signature et Cachet</h3>
                //                 </div>
                //             </div>
                //
                //             <footer>
                //                 <p class="p_1">
                //                     <strong>La Poste Tunisienne,</strong>
                //                     Rue Hédie Nouira 1030 - Tunis - Tel : 71 839000 <span>-Fax: 71831174</span>
                //                     Registre de commerce B1123081998 <span>Matricule fiscale 513287HPM000</span>
                //                 </p>
                //
                //                 <p class="p_2">
                //                     <h4>La Poste Tunisienne, un souci constant pour mieux vous servir</h4>
                //                 </p>
                //             </footer>
                //
                //         </div>
                //
                //
                //     </div>
                //     <div className="btns_publier_facture">
                //         <button onClick={togglePublier_facture} className="btn_publier_facture">
                //             Annuler
                //         </button>
                //
                //         <button class="btn" onClick={handlePublierFacture}>Publier</button>
                //     </div>
                // </div>
                <>
                    <CreateFactureTemplate factureData={factureData} factureDataToSubmit={factureDataToSubmit} handleRemiseChange={handleRemiseChange}/>
                    <div className="btns_publier_facture">
                        <button onClick={togglePublier_facture} className="btn_publier_facture">
                            Annuler
                        </button>
                        <button class="btn" onClick={handlePublierFacture}>Publier</button>
                    </div>
                </>
            )}


        </div>


    )

}

export default Publier_facture