import logo from './logo.svg';
import './App.css';
import Laposte from './components/laposte';
import React,  {useState }  from "react";
import Login from './components/forms/login'
import JwtKeyContext from './components/context/JwtKeyContext';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [jwtKey, setjwtKey] = useState(null);

  return (

      <div className="App">


        {!isLoggedIn &&
            <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} setjwtKey={setjwtKey}/>}

        {isLoggedIn &&
            <JwtKeyContext.Provider value={jwtKey}>
              <Laposte isLoggedIn={isLoggedIn}  role={role}/>
            </JwtKeyContext.Provider>
        }
      </div>

  )
}

export default App
