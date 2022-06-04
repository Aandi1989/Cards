import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import classes from './CheckEmail.module.css';
import envelope from '../../icons/envelope5.png'

export const CheckEmail = () => {

    const params=useParams()
    console.log(params)
    alert(JSON.stringify(params))

    const [searchParams,setSearchParams]=useSearchParams()
  const newPAram=Object.fromEntries(searchParams)
  alert(newPAram)

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.container__header}>Cards</h1>
                <div className={classes.imgBox}>
                <img className={classes.mailImg} src={envelope}/>
                </div>
                <p className={classes.container__infoText}>We've sent an email with instruction to example@email.com</p>
                <Link className={classes.container__backBox} to='/login'>
                    <div className={classes.container__backBox__backBotton}>Back</div>
                </Link>
                
            </div>
        </div>
    )
}