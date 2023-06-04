import './facturation.css'

import Ajouter_facture from '../../forms/ajouter_facture';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ListeFacture from './listefacture';



function FactureBoard(props) {
  const [reload, setReload] = useState([]);
  return (
    <div className="container_l">
      <ListeFacture isReload={reload}/>
      

      <div className='ajout'><Ajouter_facture data={reload} updateParentData={setReload} /></div>



    </div>


  )
}

export default FactureBoard