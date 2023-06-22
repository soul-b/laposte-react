import './styles/listeclients.css'

import Listeemployes from './listeemployes'
import Ajouter_client from '../../forms/ajouter_client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './../styles/dashboard.scss'
import Ajouter_employe from '../../forms/ajouter_employe';



function EmployeBoard(props) {
  const [reload, setReload] = useState([]);
  return (
    <div className="container_l">
      <Listeemployes isReload={reload}/>


    </div>


  )
}

export default EmployeBoard