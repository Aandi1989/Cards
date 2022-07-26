import { combineReducers, applyMiddleware, createStore, AnyAction,} from "redux";
import {useDispatch} from "react-redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { profileReducer } from "./profile-reducer";
import { packsReducer } from "./packs-reducer";

const rootReducers=combineReducers({
    app:appReducer,
    auth:authReducer,
    profile:profileReducer,
    packs:packsReducer
})

export const store=createStore(rootReducers,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>
/*we create some new hook to type dispatch and then we use this hook useAppDispatch() for dispatching
 action creators and thunk creators instead of useDispatch()*/ 
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType,unknown,AnyAction>>()

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootStateType,unknown,AnyAction>
// начинал писать чтобы внутри санки задиспатчить другую санку по примеру Валеры