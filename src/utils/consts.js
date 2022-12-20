import * as yup from 'yup'
export const SERVER_URL = 'http://localhost:8080'




// routing

export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const CLIENT_ROUTE = '/client'
export const PAGE404_ROUTE = '/404'
export const CART_ROUTE = '/cart'
export const ADMIN_ROUTE = '/admin'
export const COOK_ROUTER = '/cooker'
export const DELIVER_ROUTE = '/deliver'
export const UNAUTHORIZED_ROUTE = '/unauthorized'


export const ROLES = ["ROLE_ADMIN", "ROLE_USER", "ROLE_COOKER", "ROLE_DELIVERY"]

export const NEWROLES = [
    "Админ",
    "Клиент",
    "Повар",
    "Доставщик"
]

export const FILTERNAME= [
    "Вcе",
    "Клиент",
    "Повар",
    "Доставщик"
]

export const STATUS = ["ACCEPTED", "READY"]
export const NEWSTATUS = ["Создан", "Готов"]



export const validationsSchemaProduct = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
    photo: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
    count: yup.number().typeError('Должно быть числом').required('Это поле обязательно').positive('Введите число больше 0')
})

export const validationsSchemaRecipe = yup.object().shape({
   title: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
   description: yup.string().typeError('Должно быть строкой').required('Это поле обязательно')
})

export const validationsSchemaPosition = yup.object().shape({
    title: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
    description: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
    photo: yup.string().typeError('Должно быть строкой').required('Это поле обязательно'),
    price: yup.number().typeError('Должно быть числом').required('Это поле обязательно').positive('Введите число больше 0')
 })




