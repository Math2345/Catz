import React, {useContext} from "react";
import { useNavigate } from 'react-router-dom'

import { Context } from "..";

// modal
import Modal from "../components/Modal/Modal";

//container
import CardProductList from "../components/CardProductList";

// ui
import Title from "../components/UI/Title";
import Image from "../components/UI/Image";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg"

import { observer } from "mobx-react-lite";

//styles
import {    ShopHeaderWr, 
            LogoWr,  
            StyledModal,
            StyledModalContent,
            StyledLabelText
        } from "../styles/styles"


import { useEffect } from "react";
import { useState } from "react";

//http
import { create } from "../http/OrderApi";

import { UNAUTHORIZED_ROUTE  } from "../utils/consts";



const CART = observer(() => {
    const navigate = useNavigate()
    const {cartStore} = useContext(Context)

    const [items, setItems] = useState([])
    const [modalOrder, setModalOrder] = useState(false)

    useEffect(() => {
        const positions = cartStore.positionsInCart().map(elem => {
            return {
                'id': elem.id,
                'title': elem.title,
                'img': elem.img,
                'price': elem.price,
                'count': elem.count,
                'totalPrice': elem.price * elem.count
            }
        })

        setItems([...positions])
    }, [])


    const plusCount = (id) => {
        const index = items.findIndex(elem => elem.id === id)
        
        const selectedPos = items.find(elem => elem.id === id)

        const newSelectedPos = {
            ...selectedPos,
            count: ++selectedPos.count,
            totalPrice: selectedPos.price * selectedPos.count
        }

        setItems([...items.slice(0, index), newSelectedPos, ...items.slice(index + 1)])
    }

    const minuisCount = (id) => {
        const index = items.findIndex(elem => elem.id === id)
        
        const selectedPos = items.find(elem => elem.id === id)

        if (selectedPos.count === 0) return 0;

        const newSelectedPos = {
            ...selectedPos,
            count: --selectedPos.count,
            totalPrice: selectedPos.price * selectedPos.count
        }

        setItems([...items.slice(0, index), newSelectedPos, ...items.slice(index + 1)])
    }

    const removePositionsInCart = (id) => {
        const index = items.findIndex(elem => elem.id === id)

        if (index >= 0) {
            const newpositionsInCart = items.filter(elem =>  elem.id !== id)

            cartStore.addPositionInCart(newpositionsInCart)
            setItems([...newpositionsInCart])
        }
    }

    const handleClick = () => {
        let total = 0;
        for (let item of items) {
          total = total + (item.totalPrice)
        }
        
        cartStore.setTotalPrice(total)
    }

    const addOrderByClick = async(id) => {
        const posId = items.map((pos) => pos.id)
        const posObj = []

        posId.forEach((item) => posObj.push({
            'id': item
        }))

        await create(posObj)

        setModalOrder(false)
    }

    const logoout = () => {
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('login', '')
        sessionStorage.setItem('role', '')

        navigate(UNAUTHORIZED_ROUTE)
    }

    const stylesTable = {
        width: '100%',
        color: '#fff',
        marginBottom: '100px'
    }

    const stylesTd = {
        padding: '12px 0',
    }

    const styledWr = {
        display: 'flex',
        justifyContent: 'flex-end'
    }

    return(
        <>  
            <ShopHeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo"/></LogoWr>
                <Title>Корзина</Title>
                <Button
                                    padding={"5px 10px"}
                                    color={"#000"}
                                    onClick={logoout}
                        >           Выйти из аккаунта
            </Button>
            </ShopHeaderWr>
            <CardProductList 
                items={items}
                plusCount={plusCount} 
                minuisCount={minuisCount}
                removePositionsInCart={removePositionsInCart}
            />
            <div onClick={() => setModalOrder(true)}> 
                <Button 
                        padding={"10px"} 
                        color={"#AA3348"}
                        onClick={handleClick}
                        >
                    Cделать заказ
              </Button>
            </div>
            <Modal>
                <StyledModal active={modalOrder} onClick={() => setModalOrder(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <table style={stylesTable}>
                            <tr>
                                <td style={stylesTd}>Товар</td>
                                <td style={stylesTd}>Итого:</td>
                            </tr>
                        {items.map(elem => {
                            return <tr>
                                <td style={stylesTd}>{elem.title}</td>
                                <td style={stylesTd}>{elem.totalPrice}p</td>
                            </tr>
                        })}
                        </table>
                        <StyledLabelText margin={'15px'} size={'15px'}><span>Доставка:</span> <span>Бесплатно</span></StyledLabelText>
                        <StyledLabelText margin={'25px'} size={'17px'}><span>Общая сумма:</span> <span>{cartStore.getTotalPrice()}P</span></StyledLabelText>
                        <div style={styledWr}>
                            <Button
                                padding={"5px"} 
                                w={'inherit'}
                                onClick={() => addOrderByClick()}
                            >
                                Потвердить заказ
                            </Button>
                        </div>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
        </>
    )
})

export default CART