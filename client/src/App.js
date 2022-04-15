import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import List from './components/List'
import Register from './components/Register'
import Header from './components/partial/Header'


function App(){
  return (
    <div class='align-self-center' style={{height: "100vh", background:"#eee"}}>
        <Header />
      <div class='d-flex align-items-center' style={{height:"80%"}}>
        <List />
      </div>
      <div className='d-flex justify-content-center'>
        <Register />
      </div>
    </div>
    
  )
}

export default App;
