import './../styles/employe.css'

function Employe(props) {
    return  (
        <div>
          <ul className="responsive-table_e">
          
          <li className="table-header_e">
            <div className="col_e col_e-1">1</div>
            <div className="col_e col_e-2">Barro</div>
            <div className="col_e col_e-3">Habib</div>
            <div className="col_e col_e-4">employe1@gmail.com</div>
            <div className="col_e col_e-5">12345678</div>
            <div className="col_e col_e-6"><div><button>V</button></div><div><button>M</button></div><div><button>S</button></div></div>
          </li>
          
          
         
        </ul>
        <button className='ajout'>Ajouter</button>
        </div>
    )
    
}

export default Employe