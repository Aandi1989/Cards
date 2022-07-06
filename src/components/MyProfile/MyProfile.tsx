import React from "react";
import classes from './MyProfile.module.css';
import { ProfileDataStateType } from "../../Store/profile-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../Store/store";
import unknownUser from '../../icons/unknownUser.png'
import { InitialAuthStateType } from "../../Store/auth-reducer";
import { Navigate } from "react-router-dom";
import { PacksType } from "../../api/cards-api";



export const MyProfile=()=>{

    const {name,email,avatar}=useSelector<AppRootStateType,ProfileDataStateType>(state=>state.profile)
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    // console.log(name,email,avatar)
    const packs=useSelector<AppRootStateType,PacksType>(state=>state.packs)
    console.log(packs)

    const changingDate=(date:string)=>{
        let changedDate= date.split('-')
        let year=changedDate[0].slice(0,4)
        let month=changedDate[1]
        let currentDate=changedDate[2].slice(0,2)
        
        console.log(changedDate,year,month,currentDate)
        // console.log(`${year}.${month}.${currentDate}`)
    }
    changingDate(packs.cardPacks[0].created)

    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return(
        <div className={classes.main}>
            <div className={classes.info}>
                <div className={classes.info__title}>Personal Information</div>
                <div className={classes.info__avatarBox}>
                    <img className={classes.info__avatarBox__img} src={avatar ? avatar : unknownUser} alt="" />
                </div>
                <div className={classes.info__name}>{name}</div>
                <div className={classes.info__email}>{email}</div>
                <div className={classes.info__button}>Edit profile</div>
            </div>
        </div>
    )
}