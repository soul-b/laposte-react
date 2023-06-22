import writtenNumber from "written-number";
import React, {useContext, useEffect, useState} from "react";
import JwtKeyContext from "../../context/JwtKeyContext";

function ViewFactureTemple({factureData}){
    const jwtKey = useContext(JwtKeyContext);
    const [clientInfo,setClientInfo]= useState(null);
    const fetchData = () => {
        fetch("http://127.0.0.1:8089/api/client/"+factureData.client.id, {
            method: "get",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Server not responding');
                }
                return response.json()
            })
            .then((data) => {
                setClientInfo(data);
                console.log(data)
            }).catch((error) => {
            console.error('NetworkError:', error);
        });
    };

    useEffect(() => {
        console.log("facture data")
        console.log(factureData)
        fetchData();
    }, []);
    return(
        <div>
            <div className="overlay"></div>
            <div className="v_all">

                <div className="all">


                    <header>
                        <h2>Facture N-{factureData.numerofacture}</h2>
                    </header>

                    <div className="description">
                        <div className="adresse">
                            <h3>Nom: {clientInfo ? clientInfo.nom : "--"}</h3>
                            <h3>Matricule fiscale: {clientInfo&&clientInfo.matriculefiscale ? clientInfo.matriculefiscale : "--"}</h3>
                            <h3>Adresse: {clientInfo ? clientInfo.adresse : "--"}</h3>
                            <h3>Code postale: {clientInfo&&clientInfo.codepostale ? clientInfo.codepostale : "--"}</h3>
                            <h3>Ville: {clientInfo&&clientInfo.ville ? clientInfo.ville : "--"}</h3>
                            <h3>Téléphone: {clientInfo ? clientInfo.tel : "--"}</h3>
                        </div>

                        <div className="date">
                            <h3>Date: {factureData.date.split("T")[0]}</h3>
                            <h3>Mois: {factureData.periode.substring(0, 7)}</h3>
                            <h3>Réf: </h3>
                        </div>
                    </div>

                    <div className="facture">
                        <div className="tab">
                            <div>
                                <table border="2" className="tab_1">
                                    <tr>
                                        <th rowSpan="3">Montant Total</th>
                                        <th rowSpan="3">Prix Unitaire</th>
                                        <th rowSpan="3">Quantité</th>
                                        <th rowSpan="3">Désignation Produit/prestation Collecte</th>
                                        <th rowSpan="3">Code Produit/prestation</th>
                                    </tr>

                                    <tr>

                                    </tr>
                                    <tr></tr>

                                    {Object.entries(factureData).map(([key, value]) => {
                                        if (key.startsWith("imp_qte") && value !== 0) {
                                            const range = key.replace("imp_qte_range_", "");
                                            const impPrixRangeX = factureData[`imp_prix_range_${range}`];
                                            const impUnitpriceRangeX = factureData[`imp_unitprice_range_${range}`];
                                            const impQteRangeX = factureData[`imp_qte_range_${range}`];

                                            const randomInt = Math.floor(Math.random() * 100); // Example random value

                                            return (
                                                <tr key={key} className="import_range_x">
                                                    <td>{impPrixRangeX}</td>
                                                    <td>{impUnitpriceRangeX}</td>
                                                    <td>{impQteRangeX}</td>
                                                    <td>de {parseInt(range) - 5} a {range} depart</td>
                                                    <td>{randomInt}</td>
                                                </tr>
                                            );
                                        }

                                        return null; // Skip rendering if Qte is 0
                                    })}

                                    {/* Export ranges */}
                                    {Object.entries(factureData).map(([key, value]) => {
                                        if (key.startsWith("expQte") && value !== 0) {
                                            const range = key.replace("exp_qte_range", "");
                                            const expPrixRangeX = factureData[`exp_prix_range_${range}`];
                                            const expQteRangeX = factureData[`exp_qte_range_${range}`];

                                            const expUnitpriceRangeX = factureData[`exp_unitprice_range_${range}`];
                                            const randomInt = Math.floor(Math.random() * 100); // Example random value

                                            return (
                                                <tr key={key} className="export_range_x">
                                                    <td>{expPrixRangeX}</td>
                                                    <td>{expUnitpriceRangeX}</td>
                                                    <td>{expQteRangeX}</td>
                                                    <td>de {parseInt(range) - 5} a {range} arrive</td>
                                                    <td>{randomInt}</td>
                                                </tr>
                                            );
                                        }

                                        return null; // Skip rendering if Qte is 0
                                    })}

                                    <tr>
                                        <td>{factureData.prix_global}</td>
                                        <td colSpan="4">Montant Global</td>

                                    </tr>

                                    <tr>
                                        <td>{factureData.remise * 100}%
                                        </td>
                                        <td colSpan="4">Remise</td>

                                    </tr>

                                    <tr>
                                        <td>{factureData.prix_global_net}</td>
                                        <td colSpan="4">Montant Global Net à Payer</td>

                                    </tr>

                                </table>
                            </div>

                            <div className="tab_2_3">
                                <table border="2" className="tab_2">
                                    <tr>
                                        <th rowSpan="2">Colis Arrivée</th>
                                        <th>Nombre de Colis</th>
                                        <th>Montant</th>
                                    </tr>

                                    <tr>
                                        <td>{factureData.total_qte_import}</td>
                                        <td>{factureData.total_prix_import}</td>
                                    </tr>
                                </table>

                                <table border="2" className="tab_3">
                                    <tr>
                                        <th rowSpan="2">Colis Départ</th>
                                        <th>Nombre de Colis</th>
                                        <th>Montant</th>
                                    </tr>

                                    <tr>
                                        <td>{factureData.total_qte_export}</td>
                                        <td>{factureData.total_prix_export}</td>
                                    </tr>
                                </table>
                            </div>


                        </div>
                    </div>

                    <div className="resume">
                        <div className="payement">
                            <h3>Au Comptant </h3>
                            <h3>Par chèque </h3>
                            <h3>Par Virement </h3>
                            <h3>Veuillez virez </h3>
                            <h3>Au CCP n: 17001000000034388531 </h3>
                            <h3>Le
                                Montant: {writtenNumber(factureData.prix_global_net, {lang: 'fr'})} </h3>
                        </div>

                        <div className="signature">
                            <h3>Signature et Cachet</h3>
                        </div>
                    </div>

                    <footer>
                        <p className="p_1">
                            <strong>La Poste Tunisienne,</strong>
                            Rue Hédie Nouira 1030 - Tunis - Tel : 71 839000 <span>-Fax: 71831174</span>
                            Registre de commerce B1123081998 <span>Matricule fiscale 513287HPM000</span>
                        </p>

                        <p className="p_2">
                            <h4>La Poste Tunisienne, un souci constant pour mieux vous servir</h4>
                        </p>
                    </footer>

                </div>


            </div>

        </div>
    );
}

export default ViewFactureTemple;