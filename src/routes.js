import AdminPage from "./pages/AdminPage"
import Auth from "./pages/Auth"
import NotFoundPage from "./pages/404"
import ClientPage from "./pages/ClientPage"
import Cart from "./pages/Cart"
import CookPage from "./pages/СookPage"
import DeliverPage from "./pages/DeliverPage"
import Unauthorized from "./pages/Unauthorized"

import { ROLES } from "../src/utils/consts"

import {
        ADMIN_ROUTE, 
        REGISTRATION_ROUTE, 
        PAGE404_ROUTE,
        UNAUTHORIZED_ROUTE, 
        LOGIN_ROUTE, 
        CLIENT_ROUTE, 
        CART_ROUTE, 
        COOK_ROUTER,
        DELIVER_ROUTE
    }  from "./utils/consts"


export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Elem: Auth
    },

    {
        path: LOGIN_ROUTE, 
        Elem: Auth
    },

    {
        path: PAGE404_ROUTE,
        Elem: NotFoundPage
    },

    {
        path: UNAUTHORIZED_ROUTE,
        Elem: Unauthorized
    }
]


export const protectedRoutes = [
    {
        path: ADMIN_ROUTE,
        Elem: AdminPage,
        role: ROLES[0]
    },

    {
        path: CLIENT_ROUTE,
        Elem: ClientPage,
        role: ROLES[1]
    }, 
    
    {
        path: CART_ROUTE,
        Elem: Cart,
        role: ROLES[1]
    },

    {
        path: COOK_ROUTER,
        Elem: CookPage,
        role: ROLES[2]
    },

    {
        path: DELIVER_ROUTE,
        Elem: DeliverPage,
        role: ROLES[3]
    }
]
