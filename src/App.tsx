import React, { useEffect } from 'react';
import './App.css';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { CheckEmail } from './components/CheckEmail/CheckEmail';
import { CreatePassword } from './components/CreatePassword/CreatePassword';
import { Profile } from './components/Profile/Profile'
import { AppRootStateType, useAppDispatch } from './Store/store';
import { authTC, InitialAuthStateType } from './Store/auth-reducer';
import { useSelector } from 'react-redux';
import { InitialAppStateType } from './Store/app-reducer';
import { Preloader } from './common/Preloader'
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const dispatch = useAppDispatch()
  const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
  const { status, error } = useSelector<AppRootStateType, InitialAppStateType>(state => state.app)

  useEffect(() => {
    dispatch(authTC())
  }, [])

  if (!isInitialized) {
    return <Preloader />
  }
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/checkEmail' element={<CheckEmail/>} />
        <Route path='/set-new-password/:token' element={<CreatePassword/>} />
        <Route path="*" element={<main style={{ padding: "10px",background: "linear-gradient( rgb(230,212,222), rgb(25,118,210))" }}><p>There's nothing here!</p> </main>}/>
      </Routes>
    </div>
  );
}

export default App;
