import { $authHost, $host } from "./index";

import { SERVER_URL } from "../utils/consts";


export const findAllProducts = async () => {
    const {data} = await $host.get(`${SERVER_URL}/product`)

    return data
}


export const push = async (id, count) => {
    console.log(id, count)
    const data = await $host.post(`${SERVER_URL}/product/${id}/push?count=${count}`)

    return data
}


export const save = async ({name, photo, count}) => {
    console.log({name, photo, count})
    const {data} = await $host.post(`${SERVER_URL}/product`, {name, photo, count})

    return data
}


