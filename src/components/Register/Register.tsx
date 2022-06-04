import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { authAPI } from "../../api/cards-api";
import { InitialAppStateType, setAppErrorAC } from "../../Store/app-reducer";
import { InitialAuthStateType, registerTC } from "../../Store/auth-reducer";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import classes from './Register.module.css';

export type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Register = () => {

    const { isRegistered, isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    let { status, error } = useSelector<AppRootStateType, InitialAppStateType>(state => state.app)
    const dispatch = useAppDispatch()
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 7) {
                errors.password = 'Short password'
            } else if (values.password.search(/\d/) == -1) {
                errors.password = 'Invalid password'
            }
            if (values.confirmPassword.length < 7) {
                errors.confirmPassword = 'Short password'
            } else if (values.confirmPassword.search(/\d/) == -1) {
                errors.password = 'Invalid password'
            }
            return errors;
        },

        onSubmit: values => {
            if(values.password != values.confirmPassword){
                dispatch(setAppErrorAC('Passwords do not match'))
            }else{
                dispatch(registerTC({ email: values.email, password: values.password }))
            }
        },
    })


    if (isRegistered) {
        return <Navigate to={'/login'} />
    }

    if(error!='Passwords do not match' && error!='Email already exists'){
        error=''
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.main}>
                <div className={classes.container}>
                    <h1 className={classes.container__header}>Cards</h1>
                    <h3 className={classes.container__title}>Sign Up</h3>
                    <div className={classes.container__emailField}>
                        <TextField id="registerEmail" {...formik.getFieldProps('email')}
                            label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className={classes.errorBox}>{formik.errors.email}</div> :
                        <div className={classes.errorBox}></div>}
                    <div className={classes.container__passwordField}>
                        <TextField type='password' {...formik.getFieldProps('password')}
                            id="registerPassword" label="Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    {formik.touched.password && formik.errors.password ? <div className={classes.errorBox}>{formik.errors.password}</div> :
                        <div className={classes.errorBox}></div>}
                    <div className={classes.container__confirmPasswordField}>
                        <TextField type='password' {...formik.getFieldProps('confirmPassword')}
                            id="registerConfirmPassword" label="Confirm password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className={classes.errorBox}>
                        {formik.errors.confirmPassword}</div> : <div className={classes.errorBox}>{error}</div>}
                    <div className={classes.container__passwordInfo}>
                        <h4 className={classes.container__passwordInfo__title}>The password must contain:</h4>
                        <p className={classes.container__passwordInfo__item}>• at least 8 characters</p>
                        <p className={classes.container__passwordInfo__item}>• numbers</p>
                    </div>
                    <div className={classes.container__buttons}>
                        <Link className={classes.container__buttons__cancelBox} to='/login'>
                            <div className={classes.cancelBotton}>Cancel</div>
                        </Link>
                        <button type='submit' className={classes.signUpBotton}>Sign Up</button>
                    </div>
                </div>
            </div>
        </form>
    )
}