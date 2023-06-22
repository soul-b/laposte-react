import './styles/listeclients.css'

import ClientList2 from './clientList2'
import Ajouter_client from '../../forms/ajouter_client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './../styles/dashboard.scss'



function ClientBoard(props) {
    const [changing, setChanging] = useState(1);
    function doChanging() {
        setChanging(changing + 1);
    }

    return (
    <div className="container_l">
      <ClientList2  changing={changing} doChanging={doChanging}/>

      <div className='ajout'><Ajouter_client doChanging={doChanging}/></div>



    </div>


  )
}

export default ClientBoard