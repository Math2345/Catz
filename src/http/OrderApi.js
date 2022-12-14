import { $authHost, $host } from "./index";

import { SERVER_URL } from "../utils/consts";

export const create = async(posObj) => {
    const {data} = await $host.post(`${SERVER_URL}/order/create`, posObj)

    return data
}


export const findAll = async() => {
    const {data} = await $host.get(`${SERVER_URL}/order`)

    return data
}


export const changeStatus = async(id, orderStatus) => {
    const {data} = await $host.post(`${SERVER_URL}/order/${id}/status?orderStatus=${orderStatus}`)
}