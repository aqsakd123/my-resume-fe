import {axiosPrivate} from "../../../axios";
import axiosInstance from "../../../axios-instance";

export async function insertResume(payload) {
    return await axiosInstance.post('/api/resume/add', {...payload})
}

export async function detailResume(id) {
    return await axiosInstance.post(`/api/resume/detail/${id}`)
}

export async function filter(payload) {
    return await axiosInstance.post(`/api/resume/filter`, payload)
}

export async function updateResume(id, payload) {
    return await axiosInstance.post(`/api/resume/update/${id}`, {...payload})
}

export async function changeStatus(payload) {
    return await axiosInstance.post(`/api/resume/change-status-resume`, {...payload})
}

export async function cloneResume(id, payload) {
    return await axiosInstance.post(`/api/resume/clone/${id}`, {...payload})
}



