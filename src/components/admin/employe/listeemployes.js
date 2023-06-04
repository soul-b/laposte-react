import Employe from './employeElement.js'
import './../styles/listeemployes.css'


function Listeemployes(props) {
      return (
        <div className="container_l">
  
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">ID</div>
            <div className="col col-2">NOMS</div>
            <div className="col col-3">PRENOMS</div>
            <div className="col col-4">MAIL</div>
            <div className="col col-5">TELEPHONE</div>
            <div className="col col-6">ACTIONS</div>
          </li>
         
        </ul>
        <Employe/>
      </div>
        
        
      )
}
  
export default Listeemployes