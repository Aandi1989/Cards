import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../Store/store";
import { PacksType } from "../../api/cards-api";
import classes from './Pagination.module.css';
import { nanoid } from 'nanoid'
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import {FaAngleDoubleRight } from "react-icons/fa";
import {HiChevronDoubleRight, HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type PaginationProspType={
    getPacksFromPage:(values:number) => void
}

export const Pagination = (props:PaginationProspType) => {
    const { page, pageCount, cardPacksTotalCount } = useSelector<AppRootStateType, PacksType>(state => state.packs)
    let maxTen = Math.ceil(cardPacksTotalCount / pageCount / 10)
    let lastPage = Math.ceil(cardPacksTotalCount / pageCount)
    let [currentTen, setCurrentTen] = useState<number>(1)
    let pages = []
    for (let i = (currentTen * 10 - 9); i <= (currentTen * 10); i++) {
        if (i <= lastPage) {
            pages.push(i)
        }
    }

    const decreaseCurrentTenHandler = () => {
        if (currentTen > 1) {
            setCurrentTen(currentTen - 1)
        }
    }

    const increaseCurrentTenHandler = () => {
        if (currentTen < maxTen) {
            setCurrentTen(currentTen + 1)
        }
    }

    const setFirstTenHandler = () =>{
        setCurrentTen(1)
    }

    const setLastTenHandler = () =>{
        setCurrentTen(maxTen)
    }


    return (
        <div className={classes.main}>
            <div onClick={setFirstTenHandler} className={classes.iconWrapper}><HiOutlineChevronDoubleLeft /></div>
            <div onClick={decreaseCurrentTenHandler} className={classes.iconWrapper}><HiOutlineChevronLeft/></div>
            <div className={classes.pagesBox}>{pages.map(p => {
                return (
                    <div 
                    onClick={()=>props.getPacksFromPage(p)} 
                    className={p==page ? classes.pagesBox__page_active : classes.pagesBox__page} key={nanoid()}>{p}</div>
                )
            })}</div>
            <div onClick={increaseCurrentTenHandler} className={classes.iconWrapper}><HiOutlineChevronRight/></div>
            <div onClick={setLastTenHandler} className={classes.iconWrapper}><HiOutlineChevronDoubleRight/></div>
        </div>
    )
}

