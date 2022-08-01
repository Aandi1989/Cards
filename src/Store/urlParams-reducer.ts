import React from "react";

export type UrlParamsStateType ={
    userId?:string
    sortPacks?:string
    packName?:string
    packPage?:string | number
    packPageCount?:string | number
    min?:string | number
    max?:string | number
    currentPackId?:string
    sortCards?:string
    cardQuestion?:string
    cardPage?:string | number
    cardPageCount?:string | number
}

const initialState: UrlParamsStateType = {}

export const urlParamsReducer=(state:UrlParamsStateType = initialState,action:ActionsType)=>{
    switch(action.type){
        case "SET-PACK-URL-PARAMS":
            return{...state,...action.params}
        default:
                return state
    }
}

export const setUrlParamsAC = (params: UrlParamsStateType) => ({ type: 'SET-PACK-URL-PARAMS', params } as const)

type ActionsType = ReturnType<typeof setUrlParamsAC>