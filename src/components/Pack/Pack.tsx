import React, { useEffect, useState } from "react";
import classes from './Pack.module.css';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { BiSearch } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AppRootStateType, useAppDispatch } from "../../Store/store";
import { getCardsTC } from "../../Store/cards-reducer";
import { useSelector } from "react-redux";
import { CardsType, PacksType } from "../../api/cards-api";


export const Pack = () => {

    const params=useParams()
    const navigate = useNavigate();
    
    const [focusOnInput, setFocusOnInput] = useState<Boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const cards=useSelector<AppRootStateType,CardsType>(state=>state.cards)
    const {currentPackName}=useSelector<AppRootStateType,PacksType>(state=>state.packs)
    // console.log(cards,currentPackName)

    useEffect(()=>{
    dispatch(getCardsTC({cardsPack_id:params.packId}))
    },[params.packId])

    const setFocusOnInputHandler = (value: boolean) => () => {
        setFocusOnInput(value)
    }
    const clearInputValueHandler = () => {
        // debouncedSearchByInputValue('')
        setInputValue('')
    }
    const goBackHandler=()=>{
        navigate(-1)
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.container__header}>
                    <div className={classes.container__header__iconBackBox}>
                        <MdOutlineKeyboardBackspace onClick={goBackHandler} size={'30px'} style={{cursor:'pointer'}}/>
                    </div>
                    <div className={classes.container__header__name}>{currentPackName}</div>
                </div>
                <div className={classes.container__inputAddButtonBox}>
                    <div className={focusOnInput ? classes.container__inputAddButtonBox__inputWrapper_active :
                        classes.container__inputAddButtonBox__inputWrapper}>
                        <BiSearch style={{ color: 'rgb(176,173,191)', marginRight: '8px' }} size='20px' />
                        <input onFocus={setFocusOnInputHandler(true)} onBlur={setFocusOnInputHandler(false)}
                            placeholder="Search..." type="text"
                            onChange={(e) => {
                                setInputValue(e.currentTarget.value)
                                //     debouncedSearchByInputValue(e.currentTarget.value)
                            }}
                            value={inputValue}
                        />
                        <BsXLg onClick={clearInputValueHandler}
                            style={{ color: 'rgb(176,173,191)', marginLeft: '3px', cursor: 'pointer' }} size='12px' />
                    </div>
                    <div className={classes.container__inputAddButtonBox__addButton}>Add new card</div>
                </div>
            </div>
        </div>
    )
}