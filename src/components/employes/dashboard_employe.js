
import ImportBoard from './imports/importBoard'
import ExportBoard from './exports/exportBoard'

import Sidebar_employe from './sidebar_employe'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import JwtKeyContext from '../context/JwtKeyContext';
import { useContext } from 'react';


function DashboardEmploye() {
  const jwtKey = useContext(JwtKeyContext);
  alert(jwtKey);
      return (
        <div className="DashboardEmploye">
            <BrowserRouter>
            <Sidebar_employe/>
            <Routes>
                <Route path="/employe/gestion_import" element={<ImportBoard />} />
                <Route path="/employe/gestion_export" element={<ExportBoard/>} />
                
                
            </Routes>
            </BrowserRouter>
        </div>

      )
}
  
export default DashboardEmploye