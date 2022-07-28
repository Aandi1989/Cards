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
    // console.log(packs)

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