import React from "react";

export type UrlParamsStateType ={
    userId?:string
    sortPacks?:string
    packName?:string
    page?:string | number
    pageCount?:string | number
    min?:string | number
    max?:string | number
}

const initialState: UrlParamsStateType = {}

export const urlParamsReducer=(state:UrlParamsStateType = initialState,action:ActionsType)=>{
    switch(action.type){
        case "SET-URL-PARAMS":
            return{...state,...action.params}
        default:
                return state
    }
}

export const setUrlParamsAC = (params: UrlParamsStateType) => ({ type: 'SET-URL-PARAMS', params } as const)

type ActionsType = ReturnType<typeof setUrlParamsAC>