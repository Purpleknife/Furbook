import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

import LandingPage from './components/LandingPage';
import SideNav from './components/SideNav';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <React.StrictMode>
    <BrowserRouter>
      {/* DO NOT REMOVE Nav COMPONENT FROM HERE */}
      

      <Routes>
      <Route path="/" element={<LandingPage setUser={setUser}/>} />
      <Route path="/users" element={<SideNav user={user}/>} />
      </Routes>
        
    </BrowserRouter>
  </React.StrictMode>
  );
    
}
 
export default App;
