
import ImportBoard from './imports/importBoard'
import ExportBoard from './exports/exportBoard'

import Sidebar_employe from './sidebar_employe'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import JwtKeyContext from '../context/JwtKeyContext';
import { useContext } from 'react';
import Profile from "./profile/Profile";
import LogoutComponent from "../forms/LogoutComponent";


function DashboardEmploye({userId,isLoggedIn,setIsLoggedIn}) {
  const jwtKey = useContext(JwtKeyContext);
      return (
        <div className="DashboardEmploye">
            <BrowserRouter>
            <Sidebar_employe/>
            <Routes>
                <Route path="/employe/gestion_import" element={<ImportBoard />} />
                <Route path="/employe/gestion_export" element={<ExportBoard/>} />
                <Route path="/employe/profile" element={<Profile userId={userId}/>} />
                <Route path="/employe/logout" element={<LogoutComponent isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>} />
            </Routes>
            </BrowserRouter>
        </div>

      )
}
  
export default DashboardEmploye