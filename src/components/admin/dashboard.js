import FactureBoard from './facture/facturationBoard'
import ClientBoard from './client/clientBoard'
import Listeemployes from './employe/listeemployes'
import Sidebar from './sidebar'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';


function DashboardAdmin(props) {
      return (
        <div className="DashboardAdmin">
            <BrowserRouter>
            <Sidebar/>
            <Routes>
                <Route path="/admin/gestion_clients" element={<ClientBoard/>} />
                <Route path="/admin/gestion_employes" element={<Listeemployes/>} />
                <Route path="/admin/facturations" element={<FactureBoard/>} />
            </Routes>
            </BrowserRouter>
        </div>

      )
}
  
export default DashboardAdmin