import { $authHost, $host } from "./index";

import { SERVER_URL } from "../utils/consts";

export const saveRecipe = async(title, description, products) => {
    const data = await $host.post(`${SERVER_URL}/recipe`, {title, description, products})
}

export const findAll = async() => {
    const response = await $host.get(`${SERVER_URL}/recipe`)

    return response.data
}


export const findById = async(id) => {
    const data = await $host.get(`${SERVER_URL}/recipe/${id}`)

    return data
}
