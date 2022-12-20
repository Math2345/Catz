import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import useAuth from "../hooks/useAuth";

import { 
        LOGIN_ROUTE, 
        ADMIN_ROUTE, 
        CLIENT_ROUTE, 
        COOK_ROUTER, 
        DELIVER_ROUTE 
    } from "../utils/consts";


// api 
import { registration, auth } from "../http/UserApi";

// ui
import Title from "../components/UI/Title";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

//store



// styles
import { ContainerHeader, ContainerAuth } from "../styles/styles"


const Auth = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()

    const { setAuth } = useAuth()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const isLogin = location.pathname === LOGIN_ROUTE


    const authClick = async () => {
        try {
            let data;

            if (isLogin) {
                data = await auth(login, password)

                setAuth({
                    id: data.sub,
                    login: data.login,
                    role: data.role
                })


                if (data.role === 'ROLE_ADMIN') {
                    navigate(ADMIN_ROUTE)
                }

                if (data.role === 'ROLE_USER') {
                    navigate(CLIENT_ROUTE)
                }

                if (data.role === 'ROLE_COOKER') {
                    navigate(COOK_ROUTER)
                }

                if (data.role === 'ROLE_DELIVERY') {
                    navigate(DELIVER_ROUTE)
                }

            } else {
                data = await registration(login, password)

                navigate(LOGIN_ROUTE)
            }

            setLogin('')
            setPassword('')

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <ContainerAuth>
                <ContainerHeader><Title>{isLogin ? 'Авторизация' : 'Регистрация'}</Title></ContainerHeader>
                <Input
                    padding={"15px 30px"}
                    margin={"20px"}
                    type="text"
                    placeholder={'Email'}
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <Input
                    padding={"15px 30px"}
                    margin={"20px"}
                    type="password"
                    placeholder={'Password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button padding={"15px 30px"} onClick={authClick}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </ContainerAuth>
        </>
    )
})


export default Auth


