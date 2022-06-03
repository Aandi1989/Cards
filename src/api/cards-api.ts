import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI={
    me(){ 
        return instance.post<UserType>(`auth/me`)
    },
    login(data:LoginDataType){
        return instance.post<LoginDataType,AxiosResponse<UserType>>(`auth/login`,data)
        // return instance.post(`auth/login`,data)
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
    statusText:string
    status:number
    data:{
        info:string
    }
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

export type authType={
    statusText:string
    status:number
    data:{
        avatar: string
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
}

export type LoginType={
    statusText:string
    status:number
    data:{
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
}


// instance.post('auth/login', { email: "aliaksandr.novik2021@gmail.com", password: "vemeli16", rememberMe: true }).then(res => { console.log(res) })
// instance.post('auth/me').then(res => { console.log(res) })
// instance.delete('auth/me').then(res => { console.log(res) })