import { Dispatch } from "redux"
import { GetPacksType, PacksType, profileAPI } from "../api/cards-api"
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "./app-reducer"

const initialState : PacksType ={
    cardPacks:[],
    cardPacksTotalCount: 0,
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0
}

export const packsReducer = (state:PacksType = initialState, action: ActionsType): PacksType => {
    switch (action.type) {
        case 'SET-PACKS-DATA':
            return { ...state,...action.packs }
        default:
            return state
    }
}

export const setPacksDataAC = (packs: PacksType) => ({ type: 'SET-PACKS-DATA', packs } as const)

export const getPacksTC = (data: GetPacksType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.getPacks(data)
        .then(res => {
            // console.log(res)
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

type ActionsType = ReturnType<typeof setPacksDataAC> | SetAppErrorActionType | SetAppStatusActionType