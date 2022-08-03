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

export const DeletePopup=(props:any)=>{
    return(
        <BorderPopup setShowPopup={props.setShowPopup}>
            <div>Hello</div>
            <div>Bye!</div>
        </BorderPopup>
    )
}