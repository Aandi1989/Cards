import React from "react";
import classes from './Navbar.module.css'

export const Navbar=()=>{
    return (
       <div className={classes.main}>
           <h3 className={classes.header}>Cards</h3>
           <div className={classes.buttonBox}>
               <div className={classes.buttonBox__packs}>Packs list</div>
               <div className={classes.buttonBox__profile}>Profile</div>
           </div>
           <div className={classes.singOutButton}>Sign Out</div>
       </div>
    )
}