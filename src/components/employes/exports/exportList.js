import './../styles/exportList.css'
import ExportElment from './exportElement'
import React, { useContext, useEffect, useState } from 'react';
import Ajouter_export from '../../forms/ajouter_export';

import axios from 'axios';
import JwtKeyContext from '../../context/JwtKeyContext';



function ExportList(props) {
  const [APIData, setAPIData] = useState([]);
  const [page, setPage] = useState(1);
  const [changing, setChanging] = useState(1);

  function doChanging() {
    setChanging(changing + 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }
  function handleLastPage() {
    setPage(page - 1);
  }

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8088/api/export`)
//       .then((response) => {
//         setAPIData(response.data);
//       })
//   }, [props.isReload])


  const jwtKey = useContext(JwtKeyContext);
  const fetchData = (page) => {
    console.log("http://127.0.0.1:8089/api/exports?page="+page)
   fetch("http://127.0.0.1:8089/api/exports?page="+page, {
    headers: {
      'Authorization': `Bearer ${jwtKey}`,
      'Content-Type': 'application/json'
    }
  })
      .then((response) => response.json())
      .then((data) => setAPIData(data.exports));
  };

  useEffect(()=>{
    console.log("rerender")
    console.log(page)
    fetchData(page)
  },[page,changing])

//  const postData = () => {
//       fetch("http://127.0.0.1:8088/api/export/", {
//         method: "post",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
      
//         //make sure to serialize your JSON body
//         body: JSON.stringify({
//           nom: "Client 666",
//           tel: 6666666,
//           email: "6666@example.com",
//           adresse: "Adresse client 666",
//         })
//       })
//       .then( (response) => { 
//          //do something awesome that makes the world a better place
//          console.log(response)
//       });
//   };

  // React.useEffect(() => {
  //   postData();
  // }, []);

  return (
    <>



<div className="table">
    <div className="title">EXPORTS</div>
    <div className="sub-title">Poids des sacs</div>
    <div className="part">
      <div className="date">Date</div>
      <div className="sub-part">
        <div className="range">
          <h6>range_5</h6>
          <div className="sub-range"> 
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
        
            
          </div>
        <div className="range">
          <h6>range_10</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_15</h6>
          <div className="sub-range">
            <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_20</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_25</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        <div className="range">
          <h6>range_30</h6>
          <div className="sub-range">
          <div className="sub-range-part">N sacs</div>
          <div className="sub-range-part">Montant</div>
            
          </div>
          
            
          </div>
        
        
          
            
          </div>
          <div className="nb-total-sacs">
          <h6>Nombre Total de sacs</h6>
          
          </div>
        <div className="prix-total">
          <h6>Prix Total en dinars</h6>
        </div>
      
      <div className="action">
          <h6>ACTIONS</h6>
      </div>
    
    </div>
    
    
  </div>
    
    {Object.keys(APIData).length > 0 &&
            APIData.map((data) => {
            return (
                <ExportElment data={data} doChanging={doChanging}/>
            )
            }
            )}
        <button onClick={handleLastPage}>
            Précédent
        </button>
        <button onClick={handleNextPage}>
            Suivant
        </button>
        
        <div className='ajout'><Ajouter_export doChanging={doChanging} /></div>
    </>
    
           
 
            
  



 


  )

}

export default ExportList