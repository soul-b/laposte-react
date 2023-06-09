import './../styles/importList.css'

import ImportList from './importList'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



function ImportBoard(props) {
  return (
    <div className="container_l">
      <ImportList />
    </div>


  )
}

export default ImportBoard