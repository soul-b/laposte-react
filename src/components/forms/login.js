import React, { useState } from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./login.css";

function Login({ setIsLoggedIn, setRole, setjwtKey,setUserId }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [login, setLogin] = useState({
    username: "",
    password: "",
    type: ""
  });

  const postData = (dataToSubmit) => {
    fetch("https://127.0.0.1:8089/api/login_check", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(dataToSubmit)
    })
      .then((response) => {
        //do something awesome that makes the world a better place
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          alert("error system")
        }
      })
      .then(data => {
        // Access the response data

        console.log(data.data.roles);
        setIsSubmitted(true);
        setIsLoggedIn(true);
        setRole(data.data.roles);
        setjwtKey(data.token);
        setUserId(data.data.employeId);

        sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
        sessionStorage.setItem('role', data.data.roles);
        sessionStorage.setItem('jwtKey', data.token);
        // Perform actions with the data
      })
      .catch(error => {
        // Handle any errors that occurred during the request or response
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  };

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
      role: "ROLE_ADMIN"
    },
    {
      username: "user2",
      password: "pass2",
      role: "ROLE_USER"
    }
  ];

  const errors = {
    username: "invalid username",
    password: "invalid password"
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLogin({
      ...login,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: login.username,
      password: login.password
    };


    console.log("**************");
    console.log(JSON.stringify(userData))

    postData(userData);
  };


  // const handleSubmit = (event) => {
  //   //Prevent page reload
  //   event.preventDefault();

  //   var { username, password } = document.forms[0];

  //   // Find user login info
  //   const userData = database.find((user) => user.username === username.value);

  //   // Compare user info
  //   if (userData) {
  //     if (userData.password !== password.value) {
  //       // Invalid password
  //       setErrorMessages({ name: "password", message: errors.password });
  //     } else {
  //       setIsSubmitted(true);
  //       setIsLoggedIn(true);
  //       setRole(userData.role);
  //       setjwtKey("key");
  //     }
  //   } else {
  //     // Username not found
  //     setErrorMessages({ name: "username", message: errors.username });
  //   }
  // };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form_login">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" value={login.nom} onChange={handleChange} required />
          {renderErrorMessage("username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={login.nom} onChange={handleChange} required />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title_form">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login