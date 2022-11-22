import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

import { SERVER_URL } from "../utils/consts";

export const registration = async (login, password) => {
    const {data} = await $host.post(`${SERVER_URL}/auth/registration`, {login, password})

    return data
}

export const auth = async (login, password) => {
    const {data} = await $host.post(`${SERVER_URL}/auth`, {login, password})
    localStorage.setItem('token', data.token)
    
    return jwt_decode(data.token)
}


export const findAllUsers = async () => {
    const {data} = await $host.get(`${SERVER_URL}/user`)

    return data
}


export const PermitRole = async (roleName, id) => {
    const {data} = await $host.post(`${SERVER_URL}/user/${id}/role/permit?roleName=${roleName}`)
}

export const findById = async (id) => {
    const response = await $host.get(`${SERVER_URL}/user/${id}`)

    return response.data
}









