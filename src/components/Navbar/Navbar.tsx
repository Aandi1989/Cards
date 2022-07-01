import React from "react";
import classes from './Navbar.module.css';
import { BsPerson } from "react-icons/bs";
import { GiCardPick } from "react-icons/gi";
import { GiCardExchange } from "react-icons/gi";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { logoutTC } from "../../Store/auth-reducer";
import { useSelector } from "react-redux";
import { CurrentSectionType, InitialNavbarStateType, setCurrentSectionAC } from "../../Store/navbar-reducer";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch()
    const { currentSection} = useSelector<AppRootStateType, InitialNavbarStateType>(state => state.navbar)
    const logoutHandler = () => { dispatch(logoutTC()) }
    const setCurrentSectionHandler=(section:CurrentSectionType)=>()=>{dispatch(setCurrentSectionAC(section))}
    console.log(pathname)
    return (
        <div className={classes.main}>
            <h3 className={classes.header}>Cards</h3>
            <div className={classes.buttonBox}>
                {/* <div className={currentSection=='packsList' ? classes.buttonBox__packs_active : classes.buttonBox__packs} 
                onClick={setCurrentSectionHandler('packsList')}>
                    <GiCardExchange className={classes.buttonBox__packs__icon}/>
                    <div className={classes.buttonBox__packs__text}>Packs list</div>
                </div>
                <div className={currentSection=='profile' ? classes.buttonBox__profile_active : classes.buttonBox__profile} 
                onClick={setCurrentSectionHandler('profile')}>
                    <BsPerson className={classes.buttonBox__profile__icon}/>
                    <div className={classes.buttonBox__profile__text}>Profile</div>
                </div> */}
                <NavLink to='/profile/packsList' className={({isActive})=>isActive ? classes.buttonBox__packs_active : classes.buttonBox__packs}>
                    <GiCardExchange className={classes.buttonBox__packs__icon}/>
                    <div className={classes.buttonBox__packs__text}>Packs list</div>
                </NavLink>
                <NavLink to='/profile/myprofile' className={pathname=='/profile/myprofile' ? classes.buttonBox__packs_active : classes.buttonBox__packs}>
                    <BsPerson className={classes.buttonBox__profile__icon}/>
                    <div className={classes.buttonBox__profile__text}>Profile</div>
                </NavLink>
            </div>
            <div className={classes.singOutButton} onClick={logoutHandler}>Sign Out</div>
        </div>
    )
}