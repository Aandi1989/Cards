import React from "react";
import { Dispatch } from "redux";
import { CardType, CardsType, GetCardsDataType, cardsAPI } from "../api/cards-api";
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "./app-reducer";

const InitialState:CardsType={
    cards:[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}

export const cardsReducer=(state:CardsType=InitialState,action:ActionsType)=>{
    switch(action.type){
        case 'SET-CARDS-DATA':
            return{...state,...action.cards}
        default:
            return state
    }
}

export const setCardsDataAC=(cards:CardsType)=>({type:'SET-CARDS-DATA', cards} as const )

export const getCardsTC = (data: GetCardsDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCards(data)
        .then(res => {
            // console.log(res)
            if (res.status == 200) {
                dispatch(setCardsDataAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        })
}

export type SetCardsDataActionType = ReturnType<typeof setCardsDataAC>

type ActionsType=SetCardsDataActionType | SetAppErrorActionType | SetAppStatusActionType 