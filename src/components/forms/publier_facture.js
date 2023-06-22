import React, {useContext, useEffect, useState} from "react";
//import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import "./publier_facture.css";
import JwtKeyContext from "../context/JwtKeyContext";
import writtenNumber from 'written-number';
import CreateFactureTemplate from "../admin/facture/CreateFactureTemplate";
import JsPDF from 'jspdf';

function Publier_facture({factureData,doChanging}) {
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
                    togglePublier_facture();
                    doChanging();
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