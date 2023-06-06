import logo from './logo.svg';
import './App.css';
import Laposte from './components/laposte';
import React,  {useState,useEffect }  from "react";
import Login from './components/forms/login'
import JwtKeyContext from './components/context/JwtKeyContext';
import InternetStatusComponent from "./components/utils/InternetStatusComponent";
import NetworkDetector from "./components/utils/NetworkDetector";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [jwtKey, setjwtKey] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedRole = sessionStorage.getItem('role');
    const storedJwtKey = sessionStorage.getItem('jwtKey');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }

    if (storedRole) {
      setRole(storedRole);
    }

    if (storedJwtKey) {
      setjwtKey(storedJwtKey);
    }
  }, []);




  return (

      <div className="App">


        {!isLoggedIn &&
            <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} setjwtKey={setjwtKey}/>}

        {isLoggedIn &&
            <JwtKeyContext.Provider value={jwtKey}>
              <Laposte isLoggedIn={isLoggedIn}  role={role}/>
            </JwtKeyContext.Provider>
        }
        <InternetStatusComponent/>
      </div>

  )
}

export default App
