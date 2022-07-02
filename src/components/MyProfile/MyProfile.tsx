import React from "react";
import classes from './MyProfile.module.css';
import { ProfileDataStateType } from "../../Store/profile-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../Store/store";
import unknownUser from '../../icons/unknownUser.png'



export const MyProfile=()=>{

    const {name,email,avatar}=useSelector<AppRootStateType,ProfileDataStateType>(state=>state.profile)
    // console.log(name,email,avatar)

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