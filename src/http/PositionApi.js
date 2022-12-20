import { $authHost, $host } from "./index";

import { SERVER_URL } from "../utils/consts";

export const savePosition = async({title, description, photo, price, recipeId}) => {
    const data = await $host.post(`${SERVER_URL}/position`, {title, description, photo, price, recipeId})
}

export const findAll = async() => {
    const {data} = await $host.get(`${SERVER_URL}/position`)

    return data
}


