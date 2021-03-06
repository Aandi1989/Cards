import React, { useEffect, useState } from "react";
import classes from './Pack.module.css';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { BiSearch } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { deleteCardTC, getCardsTC, postCardTC, putCardTC } from "../../Store/cards-reducer";
import { useSelector } from "react-redux";
import { CardsType, PacksType, PostCardDataType } from "../../api/cards-api";
import Arrow from '../../icons/arrow.png'
import { changingDate } from "../../helper/ChahgingDate";
import { nanoid } from 'nanoid';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { Pagination } from "../Pagination/Pagination";
import { useDebounce } from '../../common/Debounce/debounce';
import { ProfileDataStateType } from "../../Store/profile-reducer";
import { setUrlParamsAC } from "../../Store/urlParams-reducer";


export const Pack = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [focusOnInput, setFocusOnInput] = useState<Boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [showPacksAmount, setShowPacksAmount] = useState<Boolean>(false)
    const listAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const dispatch = useAppDispatch()
    const { cards, cardsTotalCount } = useSelector<AppRootStateType, CardsType>(state => state.cards)
    const { currentPackName, currentPackId, currentPackUserId } = useSelector<AppRootStateType, PacksType>(state => state.packs)
    const { _id } = useSelector<AppRootStateType, ProfileDataStateType>(state => state.profile)
    let urlParams = Object.fromEntries(searchParams)
    let { sortCards = '0updated', cardPage = 1, cardPageCount = 10, cardQuestion } = urlParams
    let myPack = (_id == currentPackUserId)
    // const state = useSelector<AppRootStateType>(state => state)
    // console.log(myPack)

    useEffect(() => {
        dispatch(getCardsTC({
            cardsPack_id: params.packId, sortCards: sortCards, page: cardPage, pageCount: cardPageCount,
            cardQuestion: cardQuestion
        }))
    }, [params.packId, searchParams])

    const setFocusOnInputHandler = (value: boolean) => () => {
        setFocusOnInput(value)
    }
    const clearInputValueHandler = () => {
        debouncedSearchByInputValue('')
        setInputValue('')
    }
    const goBackHandler = () => {
        navigate(-1)
    }
    const setSortPacksHandler = (currentSort: string, sort0: string, sort1: string) => () => {
        if (currentSort == sort0) {
            setSearchParams({ ...urlParams, sortCards: `${sort1}` })
        } else {
            setSearchParams({ ...urlParams, sortCards: `${sort0}` })
        }
    }
    const getPacksFromPage = (page: number) => {
        setSearchParams({ ...urlParams, cardPage: `${page}` })
    }
    const toogleShowPacksAmount = () => {
        if (showPacksAmount) {
            setShowPacksAmount(false)
        } else {
            setShowPacksAmount(true)
        }
    }
    const setPageCountHandler = (amount: number) => () => {
        setSearchParams({ ...urlParams, cardPageCount: `${amount}` })
    }
    const setCardQuestion = (value: any) => {
        setSearchParams({ ...urlParams, cardQuestion: `${value}` })
    }
    const debouncedSearchByInputValue = useDebounce(setCardQuestion, 2000)

    const postCardExample = (packId: string) => () => {
        dispatch(setUrlParamsAC({ currentPackId, sortCards, cardQuestion, cardPage, cardPageCount }))
        dispatch(postCardTC({ cardsPack_id: packId }))
    }
    const putCardExample = (id: string) => () => {
        dispatch(setUrlParamsAC({ currentPackId, sortCards, cardQuestion, cardPage, cardPageCount }))
        dispatch(putCardTC({ _id: id, question: 'Updated question' }))
    }
    const deleteCardExample = (id: string) => () => {
        dispatch(setUrlParamsAC({ currentPackId, sortCards, cardQuestion, cardPage, cardPageCount }))
        dispatch(deleteCardTC(id))
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.container__header}>
                    <div className={classes.container__header__iconBackBox}>
                        <MdOutlineKeyboardBackspace onClick={goBackHandler} size={'30px'} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className={classes.container__header__name}>{currentPackName}</div>
                </div>
                {cards.length == 0 && !myPack || <div className={classes.container__inputAddButtonBox}>
                    <div className={focusOnInput ? classes.container__inputAddButtonBox__inputWrapper_active :
                        classes.container__inputAddButtonBox__inputWrapper}>
                        <BiSearch style={{ color: 'rgb(176,173,191)', marginRight: '8px' }} size='20px' />
                        <input onFocus={setFocusOnInputHandler(true)} onBlur={setFocusOnInputHandler(false)}
                            placeholder="Search..." type="text" value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.currentTarget.value)
                                debouncedSearchByInputValue(e.currentTarget.value)
                            }} />
                        <BsXLg onClick={clearInputValueHandler}
                            style={{ color: 'rgb(176,173,191)', marginLeft: '3px', cursor: 'pointer' }} size='12px' />
                    </div>
                    {myPack ? <div onClick={postCardExample(currentPackId)}
                        className={classes.container__inputAddButtonBox__addButton}>Add new card</div> : null}
                </div>}
                {cards.length > 0 ? <div className={classes.container__cardsBox__tablePageBox}>
                    <div className={classes.container__table}>
                        <div className={myPack ? classes.container__table__header_withActions : classes.container__table__header}>
                            <div className={classes.table__header__question}>Question</div>
                            <div className={classes.table__header__answer}>Answer</div>
                            <div onClick={setSortPacksHandler(sortCards, '0updated', '1updated')}
                                className={classes.table__header__updated}>
                                <div className={classes.header__udated__text}>Last Updated</div>
                                <div className={sortCards == '0updated' ? classes.table__header__iconBox :
                                    (sortCards == '1updated' ? classes.table__header__iconBox_open : classes.table__header__iconBox_closed)}>
                                    <img src={Arrow} alt="Arrow" />
                                </div>
                            </div>
                            <div onClick={setSortPacksHandler(sortCards, '0grade', '1grade')}
                                className={classes.table__header__grade}>
                                <div className={classes.header__grade__text}>Grade</div>
                                <div className={sortCards == '0grade' ? classes.table__header__iconBox :
                                    (sortCards == '1grade' ? classes.table__header__iconBox_open : classes.table__header__iconBox_closed)}>
                                    <img src={Arrow} alt="Arrow" />
                                </div>
                            </div>
                            {myPack ? <div className={classes.table__header__actions}>Actions</div> : null}
                        </div>
                        {cards.map(card => {
                            let updated = changingDate(card.updated)
                            return (
                                <div key={nanoid()} className={myPack ? classes.table__string__wrapper_withActions : classes.table__string__wrapper}>
                                    <div className={classes.table__string__question}>{card.question}</div>
                                    <div className={classes.table__string__answer}>{card.answer}</div>
                                    <div className={classes.table__string__updated}>{updated}</div>
                                    <div className={classes.table__string__grade}>
                                        <div className={classes.string__grade__iconBox}>
                                            {card.grade >= 1 ? <AiFillStar style={{ color: 'rgb(33,38,143)' }} /> : <AiOutlineStar style={{ color: 'rgb(33,38,143)' }} />}
                                        </div>
                                        <div className={classes.string__grade__iconBox}>
                                            {card.grade >= 2 ? <AiFillStar style={{ color: 'rgb(33,38,143)' }} /> : <AiOutlineStar style={{ color: 'rgb(33,38,143)' }} />}
                                        </div>
                                        <div className={classes.string__grade__iconBox}>
                                            {card.grade >= 3 ? <AiFillStar style={{ color: 'rgb(33,38,143)' }} /> : <AiOutlineStar style={{ color: 'rgb(33,38,143)' }} />}
                                        </div>
                                        <div className={classes.string__grade__iconBox}>
                                            {card.grade >= 4 ? <AiFillStar style={{ color: 'rgb(33,38,143)' }} /> : <AiOutlineStar style={{ color: 'rgb(33,38,143)' }} />}
                                        </div>
                                        <div className={classes.string__grade__iconBox}>
                                            {card.grade == 5 ? <AiFillStar style={{ color: 'rgb(33,38,143)' }} /> : <AiOutlineStar style={{ color: 'rgb(33,38,143)' }} />}
                                        </div>
                                    </div>
                                    {myPack ? <div className={classes.table__string__actions}>
                                        <div onClick={deleteCardExample(card._id)}
                                            className={classes.table__string__actions__delete}>Delete</div>
                                        <div onClick={putCardExample(card._id)}
                                            className={classes.table__string__actions__edit}>Edit</div>
                                    </div> : null}
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.container__footer}>
                        <div className={classes.container__footer__paginationBox}>
                            <Pagination page={Number(cardPage)} pageCount={Number(cardPageCount)}
                                totalCount={cardsTotalCount} getPacksFromPage={getPacksFromPage} />
                        </div>
                        <div className={classes.container__footer__pagePopupBox}>
                            <p className={classes.footer__pagePopupBox__leftText}>Show</p>
                            <div onClick={toogleShowPacksAmount} className={classes.footer__pagePopupBox__amountBox}>
                                <div className={classes.pagePopupBox__amountBox__amount}>{cardPageCount}</div>
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
                            <p className={classes.footer__pagePopupBox__rightText}>cards per page</p>
                        </div>
                    </div>
                </div> : <div className={classes.container__packsBox__emptyBox}>This pack is empty.
                    {myPack ? `Click add card to fill this pack.` : null}
                </div>}
            </div>
        </div>
    )
}
