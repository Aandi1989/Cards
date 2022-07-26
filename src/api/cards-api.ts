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
    },
    register(data:LoginDataType){
        return instance.post<LoginDataType,AxiosResponse<RegisterType>>(`auth/register`,data)
    },
    forgot(email:string){
        return instance.post<ForgotPasswordType>('auth/forgot',{...forgotData,email:email})
    }
}
const forgotData={
    email:'',
    from:'aliaksandr.novik2021@gmail.com',
    message:`<div>Password recovery <a href='http://localhost:3000/set-new-password/$token'><a/></div>`
}
export const profileAPI={
    getPacks(data:GetPacksType){
        return instance.get<GetPacksType,AxiosResponse<PacksType>>(`cards/pack`,{ params: data })
    }
}

//types
export type LoginDataType={
    email:string
    password:string
    rememberMe?:boolean
}
export type ForgotPasswordType={
    answer: boolean
    html: boolean
    info: string
    success: boolean
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
        token?: string
        tokenDeathTime?: number
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
export type RegisterType={
    addedUser:UserType
}
export type GetPacksType={
   packName?:string
   min?:number | string
   max?:number | string
   sortPacks?:string
   page?:number | string
   pageCount?:number | string
   user_id?:string | null
} 
export type PacksType={
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}  
export type PackType={
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
} 
