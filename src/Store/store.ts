import { combineReducers, applyMiddleware, createStore, AnyAction,} from "redux";
import {useDispatch} from "react-redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import thunk, { ThunkDispatch } from 'redux-thunk'

const rootReducers=combineReducers({
    app:appReducer,
    auth:authReducer
})

export const store=createStore(rootReducers,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>
/*we create some new hook to type dispatch and then we use this hook useAppDispatch() for dispatching
 action creators and thunk creators instead of useDispatch()*/ 
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType,unknown,AnyAction>>()