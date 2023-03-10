import { Dispatch } from "redux"
import { GetPacksType, PacksType, PostPackDataType, packsAPI, PutPackDataType } from "../api/cards-api"
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "./app-reducer"
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppThunk } from "./store"

const initialState : PacksType ={
    cardPacks:[],
    cardPacksTotalCount: 0,
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    currentPackId:''

}

export const packsReducer = (state:PacksType = initialState, action: ActionsType): PacksType => {
    switch (action.type) {
        case 'SET-PACKS-DATA':
            return { ...state,...action.packs }
        case 'SET-CURRENT-PACK-DATA':
            return{...state,
                    currentPackName:action.name,
                    currentPackId:action.id,
                    currentPackUserId:action.userId
                }
        default:
            return state
    }
}

export const setPacksDataAC = (packs: PacksType) => ({ type: 'SET-PACKS-DATA', packs } as const)
export const setCurrentPackDataAC=(name:string,id:string,userId:string)=>({type:'SET-CURRENT-PACK-DATA', name,id,userId} as const )

export const getPacksTC = (data: GetPacksType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks(data)
        .then(res => {
            // console.log(res)
            console.log(data)
            if (res.status == 200) {
                dispatch(setPacksDataAC(res.data))
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

export const postPackTC = (data: PostPackDataType):AppThunk => (dispatch,getState) => {
    dispatch(setAppStatusAC('loading'))
    const {userId,sortPacks,packName,packPage,packPageCount,min,max} = getState().urlParams
    packsAPI.postPack(data)
        .then(res => {
            // console.log(res)
            if (res.status == 201) {
                dispatch(getPacksTC({user_id:userId,sortPacks,packName,page:packPage,pageCount:packPageCount,min,max}))
            } else {
                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            console.log(error)
            dispatch(setAppErrorAC(error.message ? error.message : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        })
}

export const putPackTC = (data: PutPackDataType):AppThunk => (dispatch,getState) => {
    dispatch(setAppStatusAC('loading'))
    const {userId,sortPacks,packName,packPage,packPageCount,min,max} = getState().urlParams
    packsAPI.putPack(data)
        .then(res => {
            console.log(res)
            if (res.status == 200) {
                dispatch(getPacksTC({user_id:userId,sortPacks,packName,page:packPage,pageCount:packPageCount,min,max}))
            } else {
                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            console.log(error)
            dispatch(setAppErrorAC(error.message ? error.message : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deletePackTC = (packId:string):AppThunk => (dispatch,getState) => {
    dispatch(setAppStatusAC('loading'))
    const {userId,sortPacks,packName,packPage,packPageCount,min,max} = getState().urlParams
    packsAPI.deletePack(packId)
        .then(res => {
            // console.log(res)
            if (res.status == 200) {
                dispatch(getPacksTC({user_id:userId,sortPacks,packName,page:packPage,pageCount:packPageCount,min,max}))
            } else {
                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            console.log(error)
            dispatch(setAppErrorAC(error.message ? error.message : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        })
}

export type SetCurrentPackNameActionType = ReturnType<typeof setCurrentPackDataAC>
export type setPacksDataActionType = ReturnType<typeof setPacksDataAC>

type ActionsType = setPacksDataActionType | SetCurrentPackNameActionType | SetAppErrorActionType | SetAppStatusActionType 