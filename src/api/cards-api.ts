import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    me() {
        return instance.post<UserType>(`auth/me`)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserType>>(`auth/login`, data)
    },
    logout() {
        return instance.delete<LogoutType>(`auth/me`)
    },
    register(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<RegisterType>>(`auth/register`, data)
    },
    forgot(email: string) {
        return instance.post<ForgotPasswordType>('auth/forgot', { ...forgotData, email: email })
    }
}
const forgotData = {
    email: 'eugene.novik.dev@gmail.com',
    from: '',
    message: `<div>Password recovery <a href='http://localhost:3000/set-new-password/$token'><a/></div>`
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type ForgotPasswordType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
export type LogoutType = {
    info: string
    error?: string
}
export type UserType = {
    avatar?: string
    created: string
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
export type RegisterType = {
    addedUser: UserType
}

export const packsAPI = {
    getPacks(data: GetPacksType) {
        return instance.get<GetPacksType, AxiosResponse<PacksType>>(`cards/pack`, { params: data })
    },
    postPack(data: PostPackDataType) {
        return instance.post<PostPackDataType, AxiosResponse<PostPackAnswerType>>(`cards/pack`, { cardsPack: data })
    },
    putPack(data: PutPackDataType) {
        return instance.put<PutPackDataType, AxiosResponse<PutPackAnswerType>>(`cards/pack`, { cardsPack: data })
    },
    deletePack(packId: string) {
        return instance.delete<AxiosResponse<DeletePackAnswerType>>(`cards/pack?id=${packId}`)
    }
}
export type GetPacksType = {
    packName?: string
    min?: number | string
    max?: number | string
    sortPacks?: string
    page?: number | string
    pageCount?: number | string
    user_id?: string | null
}
export type PacksType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
    currentPackName?: string
    currentPackId: string
    currentPackUserId?: string
}
export type PackType = {
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
export type PostPackDataType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}
export type PostPackAnswerType = {
    newCardPack: PackType
    token: string
    tokenDeathTime: number
}
export type PutPackDataType = {
    _id: string
    name?: string
}
export type PutPackAnswerType = {
    updatedCardsPack: PackType
    token: string
    tokenDeathTime: number
}
export type DeletePackAnswerType = {
    deletedCardsPack: PackType
    token: string
    tokenDeathTime: number
}

export const cardsAPI = {
    getCards(data: GetCardsDataType) {
        return instance.get<GetCardsDataType, AxiosResponse<CardsType>>(`cards/card`, { params: data })
    },
    postCard(data: PostCardDataType) {
        return instance.post<PostCardDataType, AxiosResponse<PostCardAnswerType>>(`cards/card`, { card: data })
    },
    putCard(data: PutCardDataType) {
        return instance.put<PutCardDataType, AxiosResponse<PutCardAnswerType>>(`cards/card`, { card: data })
    },
    deleteCard(cardId: string) {
        return instance.delete<AxiosResponse<DeleteCardAnswerType>>(`cards/card?id=${cardId}`)
    }
}



export type GetCardsDataType = {
    cardsPack_id: string | undefined
    cardQuestion?: string
    min?: number | string
    max?: number | string
    sortCards?: string
    page?: number | string
    pageCount?: number | string
}
export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
    more_id?: string
    comments?: string
}
export type PostCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type PostCardAnswerType = {
    newCard: CardType
    token: string
    tokenDeathTime: number
}
export type PutCardDataType = {
    _id: string
    comments?: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type PutCardAnswerType = {
    updatedCard: updatedCardType
    token: string
    tokenDeathTime: number
}
export type updatedCardType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type DeleteCardAnswerType = {
    deletedCard:CardType
    token: string
    tokenDeathTime: number
}
 
// test commit