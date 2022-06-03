
const initialState = {
    isLoggedIn:false,
    isInitialized:false
}
export type InitialState=typeof initialState

export const authReducer=(state:InitialState=initialState, action:ActionsType)=>{
    switch(action.type){
        case 'SET-IS-LOGGED_IN':
            return {...state,isLoggedIn:action.value}
        case 'SET-IS-INITIALIZED':
            return {...state,isInitialized:action.value}
        default:
            return state
    }
}



export const setIsLoggedInAC=(value:boolean)=>({type:'SET-IS-LOGGED_IN', value} as const)
export const setIsInitializedAC=(value:boolean)=>({type:'SET-IS-INITIALIZED', value} as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>