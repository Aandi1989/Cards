export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: null | string
}

const initialState: InitialStateType={
    status:'idle',
    error:null
}

export const appReducer=(state:InitialStateType=initialState, action:ActionsType)=>{
    switch(action.type){
        case 'SET-APP-STATUS':
            return {...state,status:action.status}
        case 'SET-APP-ERROR':
            return {...state,}
        default:
            return state
    }
}

export const setAppErrorAC = (error: null|string)=>({type:'SET-APP-ERROR',error} as const)
export const setAppStatusAC = (status:RequestStatusType)=>({type:'SET-APP-STATUS',status} as const)

export type SetAppErrorActionType=ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType=ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppErrorActionType | SetAppStatusActionType