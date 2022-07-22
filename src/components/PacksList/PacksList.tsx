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
import Arrow from '../../icons/arrow.png'




export const PacksList = () => {

    const [focusOnInput, setFocusOnInput] = useState<Boolean>(false)
    const [showPacksAmount, setShowPacksAmount] = useState<Boolean>(false)
    const listAmount=[1,2,3,4,5,6,7,8,9,10]
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const { cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount } = useSelector<AppRootStateType, PacksType>(state => state.packs)
    const { _id } = useSelector<AppRootStateType, ProfileDataStateType>(state => state.profile)
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    let params = Object.fromEntries(searchParams)
    let { userId, sortPacks, page = 1, pageCount = 10 } = params

    useEffect(() => {
        dispatch(getPacksTC({ user_id: userId, sortPacks: sortPacks, page: page, pageCount: pageCount }))
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
    const setSortPacksHandler = (currentSort: string, sort0: string, sort1: string) => () => {
        if (currentSort == sort0) {
            setSearchParams({ ...params, sortPacks: `${sort1}` })
        } else {
            setSearchParams({ ...params, sortPacks: `${sort0}` })
        }
    }
    const toogleShowPacksAmount = () => {
        if (showPacksAmount) {
            setShowPacksAmount(false)
        } else {
            setShowPacksAmount(true)
        }
    }
    const setPageCountHandler=(amount:number)=>()=>{
        setSearchParams({ ...params, pageCount: `${amount}` })
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
                                <div onClick={setSortPacksHandler(sortPacks, '0cardsCount', '1cardsCount')}
                                    className={classes.table__header__cards}>
                                    <div className={classes.header__cards__text}>Cards</div>
                                    <div className={sortPacks == '0cardsCount' ? classes.header__cards__iconBox :
                                        (sortPacks == '1cardsCount' ? classes.header__cards__iconBox_open : classes.header__cards__iconBox_closed)}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
                                <div onClick={setSortPacksHandler(sortPacks, '0updated', '1updated')}
                                    className={classes.table__header__updated}>
                                    <div className={classes.header__udated__text}>Last Updated</div>
                                    <div className={sortPacks == undefined ? classes.header__updated__iconBox : (sortPacks == '0updated' ?
                                        classes.header__updated__iconBox : (sortPacks == '1updated' ? classes.header__updated__iconBox_open : classes.header__updated__iconBox_closed))}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
                                <div onClick={setSortPacksHandler(sortPacks, '0created', '1created')}
                                    className={classes.table__header__created}>
                                    <div className={classes.header__created__text}>Created by</div>
                                    <div className={sortPacks == '0created' ? classes.header__created__iconBox :
                                        (sortPacks == '1created' ? classes.header__created__iconBox_open : classes.header__created__iconBox_closed)}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
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
                        <div className={classes.container__footer}>
                            <div className={classes.container__footer__paginationBox}>
                                <Pagination getPacksFromPage={getPacksFromPage} />
                            </div>
                            <div className={classes.container__footer__pagePopupBox}>
                                <p className={classes.footer__pagePopupBox__leftText}>Show</p>
                                <div onClick={toogleShowPacksAmount} className={classes.footer__pagePopupBox__amountBox}>
                                    <div className={classes.pagePopupBox__amountBox__amount}>{pageCount}</div>
                                    <div className={showPacksAmount ? classes.pagePopupBox__amountBox__icon_opened
                                        : classes.pagePopupBox__amountBox__icon}>
                                        <img src={Arrow} alt="" />
                                    </div>
                                    <div onClick={toogleShowPacksAmount}
                                        className={showPacksAmount ? classes.pagePopupBox__amountBox__bg
                                            : classes.pagePopupBox__amountBox__bg_none}>
                                        
                                    </div>
                                    <div className={showPacksAmount?  classes.pagePopupBox__amountBox__listAmount
                                    : classes.pagePopupBox__amountBox__listAmount_none}>
                                            {listAmount.map(amount=>{
                                                return(
                                                    <div key={nanoid()} onClick={setPageCountHandler(amount)}
                                                    className={classes.pagePopupBox__amountBox__listAmount__amount}>{amount}</div>
                                                )
                                            })}
                                        </div>
                                </div>
                                <p className={classes.footer__pagePopupBox__rightText}>packs per page</p>
                            </div>
                        </div>
                    </div> : <div className={classes.container__packsBox__emptyBox}>No cards found</div>}
                </div>
            </div>
        </div>


    )
}