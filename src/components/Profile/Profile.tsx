import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import classes from './Profile.module.css';
import { authAPI, LoginDataType } from "../../api/cards-api";
import { useDispatch, useSelector } from "react-redux";
import { authTC, InitialAuthStateType } from "../../Store/auth-reducer";
import { AppRootStateType,useAppDispatch } from "../../Store/store";
import { InitialAppStateType } from "../../Store/app-reducer";

const data:LoginDataType={ email: "cards@test.com", password: "Qwertyuiop123", rememberMe: true }

export const Profile = () => {

    const dispatch=useAppDispatch()
    const { isInitialized, isLoggedIn }=useSelector<AppRootStateType,InitialAuthStateType>(state=>state.auth)
    const  { status, error }=useSelector<AppRootStateType,InitialAppStateType>(state=>state.app)

    

    // useEffect(()=>{
    //     dispatch(authTC())

    //     authAPI.me().then(response=>{console.log(response)})
    //         authAPI.logout().then(res=>console.log(res))
    //     authAPI.login(data).then(res=>console.log(res.data.name))
    // },[])

    if(!isLoggedIn){
    return <Navigate to={'/login'}/>
  }

    return (
        <div className={classes.main}>
            <h4>ProfilePage</h4><button>Log out</button>
        </div>
    )
}