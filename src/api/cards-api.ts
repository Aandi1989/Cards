import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI={
    me(){ 
        return instance.post<UserType>(`auth/me`)
    },
    login(data:LoginDataType){
        return instance.post<LoginDataType,AxiosResponse<UserType>>(`auth/login`,data)
    },
    logout(){
        return instance.delete<LogoutType>(`auth/me`)
    }
}

//types
export type LoginDataType={
    email:string
    password:string
    rememberMe:boolean
}
export type LogoutType={
    info:string
    error?:string
}
export type UserType={
        avatar?: string
        created:string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        token: string
        tokenDeathTime: number
        updated: string
        verified: boolean
    }
