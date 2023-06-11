import './facturation.css'

import Ajouter_facture from '../../forms/ajouter_facture';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ListeFacture from './listefacture';
import LineChart from "../../chart/LineChart";



function FactureBoard(props) {
  const [reload, setReload] = useState([]);
    const [changing, setChanging] = useState(1);

    function doChanging() {
        setChanging(changing + 1);
    }
  return (
    <div className="container_l">
      <ListeFacture isReload={reload} doChanging={doChanging} changing={changing}/>
      

      <div><Ajouter_facture data={reload} updateParentData={setReload} doChanging={doChanging}/></div>

    </div>


  )
}

export default FactureBoard