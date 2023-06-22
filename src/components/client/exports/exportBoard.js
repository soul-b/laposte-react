import './../styles/exportList.css'

import ExportList from './exportList'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



function ExportBoard(props) {
  return (
    <div className="container_l">
      <ExportList />
    </div>


  ) 
}

export default ExportBoard