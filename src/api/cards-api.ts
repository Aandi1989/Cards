import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


instance.post('auth/login', { email: "nya-admin@nya.nya", password: "1qazxcvBG", rememberMe: true }).then(res => { console.log(res) })
instance.post('auth/me').then(res => { console.log(res) })
instance.delete('auth/me').then(res => { console.log(res) })