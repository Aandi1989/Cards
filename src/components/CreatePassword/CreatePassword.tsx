import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import classes from './CreatePassword.module.css';

export const CreatePassword = () => {

    const{token}=useParams()
    console.log(token)
    
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <h3 className={classes.container__title}>Create new password</h3>
                <div className={classes.container__passwordField}>
                    <TextField type='password' id="standard-basic" label="Password" variant="standard" style={{ width: '100%' }} />
                </div>
                <p className={classes.container__infoText}>Create new password and we will send you further instraction to email</p>
                <button className={classes.container__createBotton}>Create new password</button>            
            </div>
        </div>
    )
}