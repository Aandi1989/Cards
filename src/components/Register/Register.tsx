import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import classes from './Register.module.css';

export const Register = () => {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <h3 className={classes.container__title}>Sign Up</h3>
                <div className={classes.container__emailField}>
                    <TextField id="standard-basic" label="Email" variant="standard" style={{ width: '100%' }} />
                </div>
                <div className={classes.container__passwordField}>
                    <TextField type='password' id="standard-basic" label="Password" variant="standard" style={{ width: '100%' }} />
                </div>
                <div className={classes.container__confirmPasswordField}>
                    <TextField type='password' id="standard-basic" label="Confirm password" variant="standard" style={{ width: '100%' }} />
                </div>
                <div className={classes.container__passwordInfo}>
                    <h4 className={classes.container__passwordInfo__title}>The password must contain:</h4>
                    <p className={classes.container__passwordInfo__item}>• at least 8 characters</p>
                    <p className={classes.container__passwordInfo__item}>• numbers</p>
                </div>
                <div className={classes.container__buttons}>
                    <Link className={classes.container__buttons__cancelBox} to='/login'>
                        <div className={classes.cancelBotton}>Cancel</div>
                    </Link>
                    <Link className={classes.container__buttons__signUpBox} to='/SignIn'>
                        <div className={classes.signUpBotton}>Sign Up</div>
                    </Link>
                </div>



            </div>
        </div>
    )
}