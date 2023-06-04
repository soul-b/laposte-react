import Login from './forms/login'
import DashboardAdmin from './admin/dashboard'

import DashboardEmploye from './employes/dashboard_employe'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';


function Laposte({role}) {
    if (role.includes("ROLE_ADMIN")) {
      return(
          <DashboardAdmin />
        );
    } else {
      if (role.includes("ROLE_USER")) {
        return(
         <DashboardEmploye />
          );
        
      } else {
        if (role.includes("ROLE_CLIENT")) {
          return(
            <div>Client</div>
            );
        } else {
          console.log("User role not found!");
        }
      }
    }
}
  
export default Laposte