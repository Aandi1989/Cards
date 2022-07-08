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

export const Pagination = () => {
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

    return (
        <div className={classes.main}>
            <BsChevronDoubleLeft />
            <BsChevronLeft/>
            <button onClick={decreaseCurrentTenHandler}>-</button>
            <div>{pages.map(p => {
                return (
                    <span key={nanoid()}>{p}</span>
                )
            })}</div>
            <button onClick={increaseCurrentTenHandler}>+</button>
            {/* <BsChevronRight/>
            <BsChevronDoubleRight/> */}
            <AiOutlineDoubleLeft/>
            {/* <BiChevronsRight/>
            <FaAngleDoubleRight/>
            <HiChevronDoubleRight/> */}
            <HiOutlineChevronDoubleRight/>
            <HiOutlineChevronDoubleLeft/>
            <HiOutlineChevronRight/>
            <HiOutlineChevronLeft/>
        </div>
    )
}

