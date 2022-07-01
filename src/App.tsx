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
import { Preloader } from './common/Preloader/Preloader'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { MyProfile } from './components/MyProfile/MyProfile';
import { PacksList } from './components/PacksList/PacksList';

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
        <Route path='/' element={<Login />} />
        <Route path='/profile/*' element={(
          <div>
            <Profile/>
            <Routes>
                <Route path='/' element={<MyProfile/>}/>
                <Route path='/myprofile' element={<MyProfile/>}/>
                <Route path='/packsList' element={<PacksList/>}/>
                <Route path='*' element={<p>Error 404. Incorrect URL.</p>}/>
            </Routes>
          </div>
        )} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/checkEmail' element={<CheckEmail />} />
        <Route path='/set-new-password/:token' element={<CreatePassword />} />
        <Route path="*" element={<p>Error 404. Incorrect URL.</p>}/>
      </Routes>
    </div>
  );
}

export default App;
