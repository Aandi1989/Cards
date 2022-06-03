import React from "react";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import classes from './Login.module.css';
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { InitialAuthStateType, loginTC } from "../../Store/auth-reducer";
import { InitialAppStateType } from "../../Store/app-reducer";
import {useFormik} from 'formik';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
 }

export const Login = () => {

    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const { status, error } = useSelector<AppRootStateType, InitialAppStateType>(state => state.app)
    const dispatch=useAppDispatch()
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if(values.password.length<7){
                errors.password='Short password'
            }else if(values.password.search(/\d/) == -1 ){
                errors.password='Invalid password'
            }
            return errors;
        },
     
        onSubmit: values => {
            dispatch(loginTC(values))
            // formik.resetForm()
        },
     })

     if(isLoggedIn){
         return <Navigate to='/'/>
     }

    return (
        <form onSubmit={formik.handleSubmit}>
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <h3 className={classes.container__title}>Sign In</h3>
                <div className={classes.container__emailField}>
                    <TextField id="standard" {...formik.getFieldProps('email')} label="Email" variant="standard" style={{ width: '100%' }} />
                </div>
                {formik.touched.email && formik.errors.email ? <div className={classes.errorBox}>{formik.errors.email}</div> : 
                <div className={classes.errorBox}></div>}
                <div className={classes.container__passwordField}>
                    <TextField type='password' {...formik.getFieldProps('password')}
                    id="standard-basic" label="Password" variant="standard" style={{ width: '100%' }} />
                </div>
                {formik.touched.password && formik.errors.password ? <div className={classes.errorBox}>{formik.errors.password}</div> : 
                 <div className={classes.errorBox}></div>}
                <div className={classes.container__rememberMeField}>
                    <FormControlLabel label={<Typography sx={{ fontSize: 14, fontWeight: '600' }}>Remember Me</Typography>} 
                    {...formik.getFieldProps('rememberMe')}  control={<Checkbox />} />
                </div>
                <Link className={classes.container__forgetPassword} to='/forgotPassword'>Forgot your password?</Link>
                    <button type='submit' className={classes.signInBotton}>Sign In</button>
                <p className={classes.container__haveAccount}>Do you have an account?</p>
                <Link className={classes.container__signUpLink} to='/register'>Sign Up</Link>
            </div>
        </div>
        </form>

    )
}

