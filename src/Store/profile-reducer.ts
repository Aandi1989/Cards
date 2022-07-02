import { Dispatch } from "redux"
import { UserType } from "../api/cards-api"

export type ProfileDataStateType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    avatar?: string
    __v: number
    _id: string
}

const initialState: ProfileDataStateType = {
    created: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: ''
}

export const profileReducer = (state:ProfileDataStateType  = initialState, action: ActionsType): ProfileDataStateType => {
    switch (action.type) {
        case 'SET-PROFILE-DATA':
            return { ...state,...action.profile }
        default:
            return state
    }
}

export const setProfileDataAC = (profile: UserType) => ({ type: 'SET-PROFILE-DATA', profile } as const)

type ActionsType = ReturnType<typeof setProfileDataAC>