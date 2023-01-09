import { observer } from "mobx-react-lite";
import React, {useState, useContext, useEffect} from "react";
import { Context } from "..";
import { useNavigate } from 'react-router-dom'

//http
import { findAll } from "../http/PositionApi";

//pages
import { CART_ROUTE, UNAUTHORIZED_ROUTE } from "../utils/consts";


// ui
import SubTitle from "../components/UI/Subtitle";
import Image from "../components/UI/Image";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg"
import CartIcon from "../static/image/cart.svg"

//styles

import {
    HeaderWr,
    LogoWr,
    StyledModal,
    StyledModalContent,
    StyledLabelText,
}
    from "../styles/styles"

// container
import PositionList from "../components/PositionList";

// modal
import Modal from "../components/Modal/Modal";

//auth
import useAuth from "../hooks/useAuth";


const ClientPage = observer(() => {
    const {positionsStore} = useContext(Context)
    const {cartStore} = useContext(Context)
    const { auth } = useAuth()

    const navigate = useNavigate()

    
    const [modalSuccessPos, setModalSuccessPos] = useState(false)
    const [login, setlogin] =  useState(null)


    useEffect(() => {
        findAll().then(data => positionsStore.setPositions(data))
        setlogin(auth.login)
    }, [])


    const addPositionToCart = (event) => {
        const cartId = +event.currentTarget.id;
    
        const _positions = positionsStore.positions.map(position => {
            return {
                'id': position.id,
                'title': position.title,
                'img': position.photo,
                'price': position.price
            }
        })

        const getPosition = _positions.find(pos => pos.id === cartId)

        const getPositionIndex = cartStore.positionsInCart().findIndex((pos) => pos.id === cartId);

        const newPosInCart = cartStore.positionsInCart().map((position) => {
            return {
                'id': position.id,
                'title': position.title,
                'img': position.img,
                'price': position.price,
                'count': position.count
            }
        });

        const getnewPosInCart = newPosInCart[getPositionIndex]

        if (getnewPosInCart) {
            const updateNewPosInCart = {
                ...getnewPosInCart,
                count: ++getnewPosInCart.count,
                totalPrice: getnewPosInCart.price * getnewPosInCart.count,
            }

            const newPosInCartArr = [...newPosInCart.slice(0, getPositionIndex), 
                                        updateNewPosInCart, 
                                        ...newPosInCart.slice(getPositionIndex  + 1)
                                    ]

            cartStore.addPositionInCart(newPosInCartArr)
           
        } else {
            const updateNewPosInCart = {
                id: getPosition.id,
                title: getPosition.title,
                img: getPosition.img,
                price: getPosition.price,
                totalPrice: getPosition.price,
                count: 1
            }

            const newPosInCartArr = [...newPosInCart, updateNewPosInCart]

            cartStore.addPositionInCart(newPosInCartArr)
    }

    const countPosInCart = cartStore.getTotalCount();

    cartStore.setTotalCount(countPosInCart + 1)

    setModalSuccessPos(true)
}

    const moveToCart = () => {
        navigate(CART_ROUTE)
    }

    const styles = {
        position: 'relative',
        top: '-13px',
        right: '10px',
        width: '23px',
        height: '23px',
        backgroundColor: '#AA3348',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3px'
    }

    const account = {
        position: 'absolute',
        top: '-34px',
        right: '-54px',
        width: '170px',
        color: '#fff'
    }

    const logoout = () => {
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('login', '')
        sessionStorage.setItem('role', '')

        navigate(UNAUTHORIZED_ROUTE)
    }


    return (
        <>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <SubTitle>Блюда</SubTitle>
                <Button 
                        image={CartIcon} 
                        size={"20px"} 
                        padding={"20px"} 
                        color={"#337EAA"}
                        onClick={moveToCart}
                        >
              </Button>
              {cartStore.getTotalCount() ? 
                <span style={styles}>{cartStore.getTotalCount()}</span>
                : null
              }
              <div style={account}>
                Вы вошли как <b>{login}</b>
              </div>
            </HeaderWr>
            <Button
                                    padding={"5px 10px"}
                                    color={"#000"}
                                    onClick={logoout}
                        >           Выйти из аккаунта
            </Button>
            <PositionList addPositionToCart={addPositionToCart}/>
            <Modal>
                <StyledModal active={modalSuccessPos} onClick={() => setModalSuccessPos(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledLabelText>Блюдо успешно добавлено в корзину</StyledLabelText>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
        </>
    )
})

export default ClientPage