import { Dispatch } from "redux"
import { authAPI, LoginDataType } from "../api/cards-api"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setAppErrorAC } from "./app-reducer"

export type InitialAuthStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
    isRegistered:boolean
}
const initialState: InitialAuthStateType = {
    isLoggedIn: false,
    isInitialized: false,
    isRegistered:false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: ActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        case 'SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.value }
        case 'SET-IS-REGISTERED':
            return { ...state, isRegistered: action.value }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({ type: 'SET-IS-LOGGED-IN', value } as const)
export const setIsInitializedAC = (value: boolean) => ({ type: 'SET-IS-INITIALIZED', value } as const)
export const setIsRegisteredAC = (value: boolean) => ({ type: 'SET-IS-REGISTERED', value } as const)

export const authTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.status == 200) {
                dispatch(setIsInitializedAC(true))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {

                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            if (error.response.status == 401) {
                dispatch(setIsInitializedAC(true))
            }
            dispatch(setAppErrorAC(error.response.data.error ? error.response.data.error : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        })
}
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.status == 200) {
                dispatch(setIsLoggedInAC(true))
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
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.status == 200) {
                dispatch(setIsLoggedInAC(false))
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
export const registerTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
    .then(res=>{
        if(res.status == 201){
                dispatch(setIsRegisteredAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC('Some server error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
    })
    .catch(error=>{
        if(error.response.data.error=='email already exists /ᐠ｡ꞈ｡ᐟ\\'){
            dispatch(setAppErrorAC('Email already exists'))
            dispatch(setAppStatusAC('failed'))
        }else{
            dispatch(setAppErrorAC(error.response.data.error ? error.response.data.error : 'Some network error occurred'))
            dispatch(setAppStatusAC('failed'))
        }
    })
}
export const forgotTC=(email:string)=>(dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(email)
    .then(res=>console.log(res))
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> |
    ReturnType<typeof setIsInitializedAC> | ReturnType<typeof setIsRegisteredAC>
    | SetAppErrorActionType | SetAppStatusActionType
