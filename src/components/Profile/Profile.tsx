import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import classes from './Profile.module.css';
import { authAPI, LoginDataType } from "../../api/cards-api";
import { useDispatch, useSelector } from "react-redux";
import { authTC, InitialAuthStateType, logoutTC } from "../../Store/auth-reducer";
import { AppRootStateType,useAppDispatch } from "../../Store/store";
import { InitialAppStateType } from "../../Store/app-reducer";

const data:LoginDataType={ email: "cards@test.com", password: "Qwertyuiop123", rememberMe: true }

export const Profile = () => {

    const dispatch=useAppDispatch()
    const { isInitialized, isLoggedIn }=useSelector<AppRootStateType,InitialAuthStateType>(state=>state.auth)
    const  { status, error }=useSelector<AppRootStateType,InitialAppStateType>(state=>state.app)
    const logoutHandler=()=>{ dispatch(logoutTC())}

    if(!isLoggedIn){
        console.log("zalupa")
    return <Navigate to={'/login'}/>
  }

    return (
        <div className={classes.main}>
            <h4>ProfilePage</h4><button onClick={logoutHandler}>Log out</button>
        </div>
    )
}