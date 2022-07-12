import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { PacksType, profileAPI } from "../../api/cards-api";
import { InitialAuthStateType } from "../../Store/auth-reducer";
import { getPacksTC } from "../../Store/packs-reducer";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import classes from './PacksList.module.css';
import { BiSearch } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { nanoid } from 'nanoid';
import { changingDate } from "../../helper/ChahgingDate";
import { ProfileDataStateType } from "../../Store/profile-reducer";
import { Pagination } from "../Pagination/Pagination";




export const PacksList = () => {

    const [focusOnInput, setFocusOnInput] = useState<Boolean>(false)
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const { cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, pageCount } = useSelector<AppRootStateType, PacksType>(state => state.packs)
    const { _id } = useSelector<AppRootStateType, ProfileDataStateType>(state => state.profile)
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    let params = Object.fromEntries(searchParams)
    console.log(params)
    let { userId, page = 1 } = params


    useEffect(() => {
        dispatch(getPacksTC({ page: page, pageCount: pageCount, user_id: userId }))
    }, [searchParams])

    const setFocusOnInputHandler = (value: boolean) => () => {
        setFocusOnInput(value)
    }
    const getMyPacksHandler = () => {
        setSearchParams({ userId: `${_id}` })
    }
    const getAllPacksHandler = () => {
        setSearchParams({})
    }
    const getPacksFromPage = (page: number) => {
        setSearchParams({ ...params, page: `${page}` })
    }

    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.container__navbar}>
                    <div className={classes.container__navbar__buttonsTitle}>Show packs cards</div>
                    <div className={classes.container__navbar__buttonsBox}>
                        <div onClick={getMyPacksHandler}
                            className={userId ? classes.navbar__buttonBox__my_active : classes.navbar__buttonBox__my}>My</div>
                        <div onClick={getAllPacksHandler}
                            className={userId ? classes.navbar__buttonBox__all : classes.navbar__buttonBox__all_active}>All</div>
                    </div>
                    <div className={classes.container__navbar__rangeTitle}>Number of cards</div>
                    <RangeSlider maxCardsCount={maxCardsCount} minCardsCount={minCardsCount} onChangeCommitted={function (values: number[]): void {
                        throw new Error("Function not implemented.");
                    }} />
                </div>
                <div className={classes.container__packsBox}>
                    <h3 className={classes.container__packsBox__title}>Packs list</h3>
                    <div className={classes.container__packsBox__inputAddButtonBox}>
                        <div className={focusOnInput ? classes.packsBox__inputAddButtonBox__inputWrapper_active :
                            classes.packsBox__inputAddButtonBox__inputWrapper}>
                            <BiSearch style={{ color: 'rgb(176,173,191)', marginRight: '8px' }} size='20px' />
                            <input onFocus={setFocusOnInputHandler(true)} onBlur={setFocusOnInputHandler(false)}
                                placeholder="Search..." type="text" />
                            <BsXLg style={{ color: 'rgb(176,173,191)', marginLeft: '3px' }} size='12px' />
                        </div>
                        <div className={classes.packsBox__inputAddButtonBox__addButton}>Add new pack</div>
                    </div>
                    {cardPacks.length > 0 ? <div className={classes.container__packsBox__tablePageBox}>
                        <div className={classes.container__packsBox__table}>
                            <div className={classes.packsBox__table__header}>
                                <div className={classes.table__header__name}>Name</div>
                                <div className={classes.table__header__cards}>Cards</div>
                                <div className={classes.table__header__updated}>Last Updated</div>
                                <div className={classes.table__header__created}>Created by</div>
                                <div className={classes.table__header__actions}>Actions</div>
                            </div>
                            {cardPacks.map(pack => {
                                let updated = changingDate(pack.updated)
                                return (
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
                        <Pagination getPacksFromPage={getPacksFromPage} />
                    </div> : <div className={classes.container__packsBox__emptyBox}>No cards found</div>}
                </div>
            </div>
        </div>


    )
}