import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { forgotTC, InitialAuthStateType } from "../../Store/auth-reducer";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { FormikErrorType } from "../Login/Login";
import classes from './ForgotPassword.module.css';

export const ForgotPassword = () => {

    const dispatch = useAppDispatch()
    const {isEmailSent}=useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },

        onSubmit: values => {
            dispatch(forgotTC(values.email))
        },
    })
    if (isEmailSent) {
        return <Navigate to={'/checkEmail'} />
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.main}>
                <div className={classes.container}>
                    <h1 className={classes.container__header}>Cards</h1>
                    <h3 className={classes.container__title}>Forgot your password?</h3>
                    <div className={classes.container__emailField}>
                        <TextField id="standard-basic" {...formik.getFieldProps('email')}
                            label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className={classes.errorBox}>{formik.errors.email}</div> :
                        <div className={classes.errorBox}></div>}
                    <p className={classes.container__enterEmailText}>Enter your email address and we will send you further instructions</p>
                    <button type='submit' className={classes.sendInstrBotton}>Send Instruction</button>
                    <p className={classes.container__rememberPasswordText}>Did you remember your password?</p>
                    <Link className={classes.container__tryLogLink} to='/login'>Try logging in</Link>

                </div>
            </div>
        </form>
    )
}