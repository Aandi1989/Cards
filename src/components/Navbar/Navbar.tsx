import React from "react";
import classes from './Navbar.module.css';
import { BsPerson } from "react-icons/bs";
import { GiCardPick } from "react-icons/gi";
import { GiCardExchange } from "react-icons/gi";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { InitialAuthStateType, logoutTC } from "../../Store/auth-reducer";
import { useSelector } from "react-redux";
import { CurrentSectionType, InitialNavbarStateType, setCurrentSectionAC } from "../../Store/navbar-reducer";
import { Navigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";


export const Navbar = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch()
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const logoutHandler = () => { dispatch(logoutTC()) }
    // console.log(pathname)
    
    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }
    
    return (
        <div className={classes.main}>
            <h3 className={classes.header}>Cards</h3>
            <div className={classes.buttonBox}>
                <NavLink to='/main/packsList' className={({isActive})=>isActive ? classes.buttonBox__packs_active : classes.buttonBox__packs}>
                    <GiCardExchange className={classes.buttonBox__packs__icon}/>
                    <div className={classes.buttonBox__packs__text}>Packs list</div>
                </NavLink>
                <NavLink to='/main/myprofile' className={pathname=='/main/myprofile' ? classes.buttonBox__packs_active : classes.buttonBox__packs}>
                    <BsPerson className={classes.buttonBox__profile__icon}/>
                    <div className={classes.buttonBox__profile__text}>Profile</div>
                </NavLink>
            </div>
            <div className={classes.singOutButton} onClick={logoutHandler}>Sign Out</div>
        </div>
    )
}