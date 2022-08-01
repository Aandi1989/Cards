import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import { PacksType, packsAPI, PutPackDataType } from "../../api/cards-api";
import { InitialAuthStateType } from "../../Store/auth-reducer";
import { deletePackTC, getPacksTC, postPackTC, putPackTC } from "../../Store/packs-reducer";
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
import { useDebounce } from '../../common/Debounce/debounce';
import { setUrlParamsAC } from "../../Store/urlParams-reducer";
import { setCurrentPackDataAC } from "../../Store/packs-reducer";




export const PacksList = () => {

    const [focusOnInput, setFocusOnInput] = useState<Boolean>(false)
    const [showPacksAmount, setShowPacksAmount] = useState<Boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const listAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { isInitialized, isLoggedIn } = useSelector<AppRootStateType, InitialAuthStateType>(state => state.auth)
    const { cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount } = useSelector<AppRootStateType, PacksType>(state => state.packs)
    const { _id } = useSelector<AppRootStateType, ProfileDataStateType>(state => state.profile)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    let params = Object.fromEntries(searchParams)

    let { userId, sortPacks='0updated', packName, packPage = 1, packPageCount = 10, min = minCardsCount, max = maxCardsCount } = params
    useEffect(() => {
        dispatch(getPacksTC({
            user_id: userId, sortPacks: sortPacks, packName: packName, page: packPage, pageCount: packPageCount,
            min: min, max: max
        }))
    }, [searchParams])

    const examplePostRequest = () => {
        dispatch(setUrlParamsAC({ userId, sortPacks, packName, packPage, packPageCount, min, max }))
        dispatch(postPackTC({ name: 'New pack' }))
    }
    const examplePutRequest = (data: PutPackDataType) => () => {
        dispatch(setUrlParamsAC({ userId, sortPacks, packName, packPage, packPageCount, min, max }))
        dispatch(putPackTC(data))
    }
    const exampleDeleteRequest = (packId: string) => () => {
        dispatch(setUrlParamsAC({ userId, sortPacks, packName, packPage, packPageCount, min, max }))
        dispatch(deletePackTC(packId))
        // console.log({id})
    }

    const setFocusOnInputHandler = (value: boolean) => () => {
        setFocusOnInput(value)
    }
    const getMyPacksHandler = () => {
        setSearchParams({ userId: `${_id}` })
        setInputValue('')
    }
    const getAllPacksHandler = () => {
        setSearchParams({})
        setInputValue('')
    }
    const getPacksFromPage = (page: number) => {
        setSearchParams({ ...params, packPage: `${page}` })
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
    const setPageCountHandler = (amount: number) => () => {
        setSearchParams({ ...params, packPageCount: `${amount}` })
    }

    const setPackName = (value: any) => {
        setSearchParams({ ...params, packName: `${value}` })
    }

    const setMinMaxCardsValues = (values: number[]) => {
        setSearchParams({ ...params, min: `${values[0]}`, max: `${values[1]}` })
    }

    const debouncedSearchByInputValue = useDebounce(setPackName, 2000)
    const debounceSearchByMinMaxValue = useDebounce(setMinMaxCardsValues, 2000)

    const clearInputValueHandler = () => {
        debouncedSearchByInputValue('')
        setInputValue('')
    }
    const setCurrentPackNameHandler=(name:string,id:string,packId:string)=>()=>{
        dispatch(setCurrentPackDataAC(name,id,packId))
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
                    <RangeSlider maxCardsCount={maxCardsCount} minCardsCount={minCardsCount} onChangeCommitted={debounceSearchByMinMaxValue} />
                </div>
                <div className={classes.container__packsBox}>
                    <h3 className={classes.container__packsBox__title}>Packs list</h3>
                    <div className={classes.container__packsBox__inputAddButtonBox}>
                        <div className={focusOnInput ? classes.packsBox__inputAddButtonBox__inputWrapper_active :
                            classes.packsBox__inputAddButtonBox__inputWrapper}>
                            <BiSearch style={{ color: 'rgb(176,173,191)', marginRight: '8px' }} size='20px' />
                            <input onFocus={setFocusOnInputHandler(true)} onBlur={setFocusOnInputHandler(false)}
                                placeholder="Search..." type="text" onChange={(e) => {
                                    setInputValue(e.currentTarget.value)
                                    debouncedSearchByInputValue(e.currentTarget.value)
                                }}
                                value={inputValue} />
                            <BsXLg onClick={clearInputValueHandler}
                                style={{ color: 'rgb(176,173,191)', marginLeft: '3px', cursor: 'pointer' }} size='12px' />
                        </div>
                        <div onClick={examplePostRequest}
                            className={classes.packsBox__inputAddButtonBox__addButton}>Add new pack</div>
                    </div>
                    {cardPacks.length > 0 ? <div className={classes.container__packsBox__tablePageBox}>
                        <div className={classes.container__packsBox__table}>
                            <div className={classes.packsBox__table__header}>
                                <div className={classes.table__header__name}>Name</div>
                                <div onClick={setSortPacksHandler(sortPacks, '0cardsCount', '1cardsCount')}
                                    className={classes.table__header__cards}>
                                    <div className={classes.header__cards__text}>Cards</div>
                                    <div className={sortPacks == '0cardsCount' ? classes.table__header__iconBox :
                                        (sortPacks == '1cardsCount' ? classes.table__header__iconBox_open : classes.table__header__iconBox_closed)}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
                                <div onClick={setSortPacksHandler(sortPacks, '0updated', '1updated')}
                                    className={classes.table__header__updated}>
                                    <div className={classes.header__udated__text}>Last Updated</div>
                                    <div className={sortPacks == '0updated' ? classes.table__header__iconBox :
                                        (sortPacks == '1updated' ? classes.table__header__iconBox_open : classes.table__header__iconBox_closed)}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
                                <div onClick={setSortPacksHandler(sortPacks, '0created', '1created')}
                                    className={classes.table__header__created}>
                                    <div className={classes.header__created__text}>Created by</div>
                                    <div className={sortPacks == '0created' ? classes.table__header__iconBox :
                                        (sortPacks == '1created' ? classes.table__header__iconBox_open : classes.table__header__iconBox_closed)}>
                                        <img src={Arrow} alt="Arrow" />
                                    </div>
                                </div>
                                <div className={classes.table__header__actions}>Actions</div>
                            </div>
                            {cardPacks.map(pack => {
                                let updated = changingDate(pack.updated)
                                return (
                                    <div key={nanoid()} className={classes.table__string__wrapper}>
                                        <NavLink to={`/main/pack/${pack._id}`} onClick={setCurrentPackNameHandler(pack.name,pack._id,pack.user_id)}
                                         className={classes.table__string__name}>{pack.name}</NavLink>
                                        <div className={classes.table__string__cards}>{pack.cardsCount}</div>
                                        <div className={classes.table__string__updated}>{updated}</div>
                                        <div className={classes.table__string__created}>{pack.user_name}</div>
                                        <div className={classes.table__string__actions}>
                                            {pack.user_id == _id ?
                                                <div onClick={exampleDeleteRequest(pack._id)}
                                                    className={classes.table__string__actions__delete}>Delete</div> : null}
                                            {pack.user_id == _id ?
                                                <div onClick={examplePutRequest({ _id: pack._id, name: 'Changed Name' })}
                                                    className={classes.table__string__actions__edit}>Edit</div> : null}
                                            {pack.cardsCount > 0 ? <div className={classes.table__string__actions__learn}>Learn</div> : null}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={classes.container__footer}>
                            <div className={classes.container__footer__paginationBox}>
                                <Pagination page={Number(packPage)} pageCount={Number(packPageCount)}
                                totalCount={cardPacksTotalCount} getPacksFromPage={getPacksFromPage} />
                            </div>
                            <div className={classes.container__footer__pagePopupBox}>
                                <p className={classes.footer__pagePopupBox__leftText}>Show</p>
                                <div onClick={toogleShowPacksAmount} className={classes.footer__pagePopupBox__amountBox}>
                                    <div className={classes.pagePopupBox__amountBox__amount}>{packPageCount}</div>
                                    <div className={showPacksAmount ? classes.pagePopupBox__amountBox__icon_opened
                                        : classes.pagePopupBox__amountBox__icon}>
                                        <img src={Arrow} alt="" />
                                    </div>
                                    <div onClick={toogleShowPacksAmount}
                                        className={showPacksAmount ? classes.pagePopupBox__amountBox__bg
                                            : classes.pagePopupBox__amountBox__bg_none}>

                                    </div>
                                    <div className={showPacksAmount ? classes.pagePopupBox__amountBox__listAmount
                                        : classes.pagePopupBox__amountBox__listAmount_none}>
                                        {listAmount.map(amount => {
                                            return (
                                                <div key={nanoid()} onClick={setPageCountHandler(amount)}
                                                    className={classes.pagePopupBox__amountBox__listAmount__amount}>{amount}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <p className={classes.footer__pagePopupBox__rightText}>packs per page</p>
                            </div>
                        </div>
                    </div> : <div className={classes.container__packsBox__emptyBox}>No packs found</div>}
                </div>
            </div>
        </div>


    )
}