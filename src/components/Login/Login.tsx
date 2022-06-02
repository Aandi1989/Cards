import React from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from './Login.module.css';

export const Login = () => {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <h3 className={classes.container__title}>Sign In</h3>
                <div className={classes.container__emailField}>
                    <TextField id="standard-basic" label="Email" variant="standard" style={{ width: '100%'}} />
                </div>
                <div className={classes.container__passwordField}>
                    <TextField type='password' id="standard-basic" label="Password" variant="standard" style={{ width: '100%' }} />
                </div>
                <div className={classes.container__rememberMeField}>
                    <FormControlLabel label={<Typography sx={{fontSize: 14,fontWeight:'600'}}>Remember Me</Typography>} control={<Checkbox/>}/>
                </div>
                <Link className={classes.container__forgetPassword} to='!'>Forgot your password?</Link>
                <Link className={classes.container__signInBox} to='/SignIn'>
                    <div className={classes.signInBotton}>Sign In</div>
                </Link>
                <p className={classes.container__haveAccount}>Do you have an account?</p>
                <Link className={classes.container__signUpLink} to='/SingUp'>Sign Up</Link>
                
            </div>
        </div>
    )
}