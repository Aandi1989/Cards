import React, { useState } from "react";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import classes from './PacksList.module.css';



export const PacksList=()=>{

    type PacksCategoryType='my'|'all';
    const[currentPacksCategory,setCurrentPacksCategory]=useState<PacksCategoryType>('all')

    const setCurrentPacksCategoryHandler=(category:PacksCategoryType)=>()=>{
        setCurrentPacksCategory(category)
    }

    return(
        <div className={classes.main}> 
            <div className={classes.container}>
                 <div className={classes.container__navbar}>
                    <div className={classes.container__navbar__buttonsTitle}>Show packs cards</div>
                    <div className={classes.container__navbar__buttonsBox}>
                        <div onClick={setCurrentPacksCategoryHandler('my')} 
                        className={currentPacksCategory=='my' ? classes.navbar__buttonBox__my_active : classes.navbar__buttonBox__my}>My</div>
                        <div onClick={setCurrentPacksCategoryHandler('all')} 
                        className={currentPacksCategory=='all' ? classes.navbar__buttonBox__all_active : classes.navbar__buttonBox__all}>All</div>
                    </div>
                    <div className={classes.container__navbar__rangeTitle}>Number of cards</div>
                    <RangeSlider maxCardsCount={100} minCardsCount={0} onChangeCommitted={function (values: number[]): void {
                        throw new Error("Function not implemented.");
                    } }/>
                 </div>
                <div className={classes.container__packsBox}></div>
            </div>
        </div>   
               
       
    )
}