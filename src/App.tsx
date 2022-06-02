import React, { useEffect } from 'react';
import './App.css';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import {CheckEmail} from './components/CheckEmail/CheckEmail'
import {CreatePassword} from './components/CreatePassword/CreatePassword'

function App() {
  useEffect(() => {
    
  }, [])	
  return (
    <div className="App">
      <Login/>
      {/* <Register/> */}
      {/* <ForgotPassword/> */}
      {/* <CheckEmail/> */}
      {/* <CreatePassword/> */}
    </div>
  );
}

export default App;
