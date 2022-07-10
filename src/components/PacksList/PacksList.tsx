import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { PacksType, profileAPI } from "../../api/cards-api";
import { InitialAuthStateType } from "../../Store/auth-reducer";
import { getPacksTC } from "../../Store/packs-reducer";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import classes from './PacksList.module.css';
import { BiSearch}  from "react-icons/bi";
import { BsXLg}  from "react-icons/bs";
import { nanoid } from 'nanoid';
import { changingDate } from "../../helper/ChahgingDate";
import { ProfileDataStateType } from "../../Store/profile-reducer";
import { Pagination } from "../Pagination/Pagination";




export const PacksList=()=>{
   
    type PacksCategoryType='my'|'all';
    const[currentPacksCategory,setCurrentPacksCategory]=useState<PacksCategoryType>('all')
    const[focusOnInput,setFocusOnInput]=useState<Boolean>(false)
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const  {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount,page,pageCount}=useSelector<AppRootStateType,PacksType>(state=>state.packs)
    const {_id}=useSelector<AppRootStateType,ProfileDataStateType>(state=>state.profile)
    const dispatch=useAppDispatch()

    const [searchParams,setSearchParams]=useSearchParams()
    let userIdFromUrl=searchParams.get('userId')
    console.log(Object.fromEntries(searchParams))
    let urlParams=Object.fromEntries(searchParams)
    // в запросе useEffect использовать параметры полученные из url строки , если какого-либо параметра нет то задаем его по 
    // умолчании вытягивая из редакса либо просто задаем нужное нам по умолчанию значение
    // let obj = {
    //     month: 12,
    //     day:   31,
    // };
    // let {year = 2025, month, day} = obj;

    useEffect(() => {
            dispatch(getPacksTC({page:page, pageCount:pageCount, user_id:userIdFromUrl}))
        }, [searchParams])

    const setFocusOnInputHandler=(value:boolean)=>()=>{
        setFocusOnInput(value)
    }
    const getMyPacksHandler=()=>{
        dispatch(getPacksTC({page:page, pageCount:pageCount,user_id:_id}))
        setCurrentPacksCategory('my')
    }
    const getAllPacksHandler=()=>{
        dispatch(getPacksTC({page:page, pageCount:pageCount}))
        setCurrentPacksCategory('all')
    }
    const setUserIdHandler=()=>{
        setSearchParams({userId:`${_id}`})
    }
    const exampleHandler=()=>{
        setSearchParams({...urlParams,example:'1'})
    }
    

    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return(
        <div className={classes.main}> 
            <div className={classes.container}>
                 <div className={classes.container__navbar}>
                    <div onClick={exampleHandler} className={classes.container__navbar__buttonsTitle}>Show packs cards</div>
                    <div className={classes.container__navbar__buttonsBox}>
                        <div onClick={getMyPacksHandler} 
                        className={currentPacksCategory=='my' ? classes.navbar__buttonBox__my_active : classes.navbar__buttonBox__my}>My</div>
                        <div onClick={getAllPacksHandler} 
                        className={currentPacksCategory=='all' ? classes.navbar__buttonBox__all_active : classes.navbar__buttonBox__all}>All</div>
                    </div>
                    <div className={classes.container__navbar__rangeTitle}>Number of cards</div>
                    <RangeSlider maxCardsCount={maxCardsCount} minCardsCount={minCardsCount} onChangeCommitted={function (values: number[]): void {
                        throw new Error("Function not implemented.");
                    } }/>
                 </div>
                <div className={classes.container__packsBox}>
                    <h3  className={classes.container__packsBox__title}>Packs list</h3>
                    <div className={classes.container__packsBox__inputAddButtonBox}>
                        <div className={focusOnInput ? classes.packsBox__inputAddButtonBox__inputWrapper_active : 
                            classes.packsBox__inputAddButtonBox__inputWrapper}>
                            <BiSearch style={{color:'rgb(176,173,191)',marginRight:'8px'}} size='20px'/> 
                            <input onFocus={setFocusOnInputHandler(true)} onBlur={setFocusOnInputHandler(false)}
                            placeholder="Search..." type="text" />
                            <BsXLg style={{color:'rgb(176,173,191)', marginLeft:'3px'}} size='12px'/>
                        </div>
                        <div onClick={setUserIdHandler} className={classes.packsBox__inputAddButtonBox__addButton}>Add new pack</div>
                    </div>
                    <div className={classes.container__packsBox__table}>
                        <div className={classes.packsBox__table__header}>
                            <div className={classes.table__header__name}>Name</div>
                            <div className={classes.table__header__cards}>Cards</div>
                            <div className={classes.table__header__updated}>Last Updated</div>
                            <div className={classes.table__header__created}>Created by</div>
                            <div className={classes.table__header__actions}>Actions</div>
                        </div>
                        {cardPacks.map(pack=>{
                            let updated=changingDate(pack.updated)
                            return(
                                <div key={nanoid()} className={classes.table__string__wrapper}>
                                    <div className={classes.table__string__name}>{pack.name}</div>
                                    <div className={classes.table__string__cards}>{pack.cardsCount}</div>
                                    <div className={classes.table__string__updated}>{updated}</div>
                                    <div className={classes.table__string__created}>{pack.user_name}</div>
                                    <div className={classes.table__string__actions}>---</div>
                                </div>
                            )
                        })}
                    </div>
                    <Pagination/>
                </div>
            </div>
        </div>   
               
       
    )
}