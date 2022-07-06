import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import classes from './Profile.module.css';
import { authAPI, LoginDataType, profileAPI } from "../../api/cards-api";
import { useDispatch, useSelector } from "react-redux";
import { authTC, InitialAuthStateType, logoutTC } from "../../Store/auth-reducer";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { InitialAppStateType } from "../../Store/app-reducer";
import { Header } from "../Header/Header";
import { MyProfile } from "../MyProfile/MyProfile";
import { PacksList } from "../PacksList/PacksList";

const data: LoginDataType = { email: "cards@test.com", password: "Qwertyuiop123", rememberMe: true }

export const Profile = () => {

    const dispatch = useAppDispatch()
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const { status, error } = useSelector<AppRootStateType, InitialAppStateType>(state => state.app)

    useEffect(() => {
        if (isLoggedIn) {
            // console.log('useEffect inside Profile')
            profileAPI.getPacks({ page: 2,user_id:"629654472f55f600047d09b4" }).then(res => console.log(res))
        }
    }, [isLoggedIn])

    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (


        <div className={classes.main}>
            <Header />

        </div>

    )
}