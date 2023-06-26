import {axiosPrivate} from "../../../axios";
import axiosInstance from "../../../axios-instance";

export async function signIn(payload) {
    return await axiosInstance.post('/signIn', payload)
}

export async function signOut() {
    return await axiosInstance.post('/signOut')
}

export async function fetchTestAPI() {
    return await axiosInstance.get('/api/resume/test')
}

export async function registerUser(payload) {
    return await axiosInstance.post('/register', {...payload})
}

