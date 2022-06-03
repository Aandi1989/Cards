import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import classes from './ForgotPassword.module.css';

export const ForgotPassword = () => {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <h3 className={classes.container__title}>Forgot your password?</h3>
                <div className={classes.container__emailField}>
                    <TextField id="standard-basic" label="Email" variant="standard" style={{ width: '100%' }} />
                </div>
                <p className={classes.container__enterEmailText}>Enter your email address and we will send you further instructions</p>
                <Link className={classes.container__sendInstrBox} to='/checkEmail'>
                    <div className={classes.sendInstrBotton}>Send Instruction</div>
                </Link>
                <p className={classes.container__rememberPasswordText}>Did you remember your password?</p>
                <Link className={classes.container__tryLogLink} to='/login'>Try logging in</Link>
                
            </div>
        </div>
    )
}