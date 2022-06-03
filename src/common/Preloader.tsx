import React from "react";
import classes from './Preloader.module.css'
import spinner from '../icons/oldSpinner.svg'

export const Preloader=()=>{
    return(
        <div className={classes.main}>
            <div className={classes.imgContainer}>
                <img src={spinner} />
            </div>
        </div>
    )
}