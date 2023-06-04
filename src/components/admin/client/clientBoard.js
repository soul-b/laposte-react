import './styles/listeclients.css'

import ClientList2 from './clientList2'
import Ajouter_client from '../../forms/ajouter_client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



function ClientBoard(props) {
  const [reload, setReload] = useState([]);
  return (
    <div className="container_l">
      <ClientList2 isReload={reload}/>

      <div className='ajout'><Ajouter_client data={reload} updateParentData={setReload} /></div>



    </div>


  )
}

export default ClientBoard