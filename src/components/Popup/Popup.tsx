import React from "react";
import classes from './Popup.module.css';


export const BorderPopup=(props:any)=>{
    return(
        <div onClick={()=>props.setShowPopup(false)} className={classes.main}>
            <div onClick={(e)=>e.stopPropagation()} className={classes.container}>
                {props.children}
            </div>
        </div>
    )
}