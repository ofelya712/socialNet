import axios from "axios";
import { IChange, IResponse, IUser, PartialUser } from "./types";

export const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const handleSignupRequest = async (user: IUser): Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}

export const handleLogin = async (user: PartialUser): Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}

export const verifyUser = async (): Promise<IResponse> => {
    const response = await Axios.get('/verify')
    return response.data
}

export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}

export const handleUpload = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.patch('/profile/upload', form)
    return response.data
}

export const addPost = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.post('/posts', form)
    return response.data
}

export const getAllPost = async (): Promise<IResponse> => {
    const response = await Axios.get('/posts')
    return response.data
}

export const checkAccount = async (): Promise<IResponse> => {
    const response = await Axios.patch('/account/set')
    return response.data
}

export const changePassword = async (user: IChange): Promise<IResponse> => {
    const response = await Axios.patch('/update/password', user)
    return response.data
}

export const changeLogin=async(user:IChange):Promise<IResponse>=>{
    const response=await Axios.patch('/update/login',user)
    return response.data
}

export const handleDelete=async(id:number):Promise<IResponse>=>{
    const response=await Axios.delete(`/posts/${id}`)
    return response.data
}


