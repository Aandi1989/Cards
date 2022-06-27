export type CurrentSectionType = 'packsList' | 'profile'
export type InitialNavbarStateType = {
    currentSection: CurrentSectionType
}

const initialState: InitialNavbarStateType={
    currentSection:'packsList'
}

export const navbarReducer=(state:InitialNavbarStateType=initialState, action:ActionsType):InitialNavbarStateType=>{
    switch(action.type){
        case 'SET-CURRENT-SECTION':
            return {...state,currentSection:action.currentSection}
        default:
            return state
    }
}

export const setCurrentSectionAC = (currentSection:CurrentSectionType)=>({type:'SET-CURRENT-SECTION',currentSection} as const)

export type SetCurrentSectionType=ReturnType<typeof setCurrentSectionAC>

type ActionsType =  SetCurrentSectionType