import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from './Profile.module.css';
import { authAPI, LoginDataType } from "../../api/cards-api";

const data:LoginDataType={ email: "aliaksandr.novik2021@gmail.com", password: "vemeli16", rememberMe: true }

export const Profile = () => {

    useEffect(()=>{
        // authAPI.me().then(response=>{console.log(response.data.name)})
            // authAPI.logout().then(res=>console.log(res))
        authAPI.login(data).then(res=>console.log(res.data.name))
    },[])

    return (
        <div className={classes.main}>
            <h4>ProfilePage</h4><button>Log out</button>
        </div>
    )
}